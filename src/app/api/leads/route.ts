import { NextResponse } from 'next/server';

import { rateLimit } from '@/lib/rate-limit';
import { leadFormSchema } from '@/lib/validation';

// Never cache this endpoint.
export const dynamic = 'force-dynamic';

const MAX_REQ_PER_HOUR = Number(process.env.RATE_LIMIT_LEAD_PER_HOUR ?? 5);
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * Resolve client IP from common reverse-proxy headers (Vercel sets x-forwarded-for).
 */
function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim() ?? 'unknown';
  const real = req.headers.get('x-real-ip');
  return real ?? 'unknown';
}

/**
 * Escape HTML in case lead content is rendered in an email template.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function renderEmailHtml(input: ReturnType<typeof leadFormSchema.parse>): string {
  const rows: Array<[string, string]> = [
    ['Nama', input.fullName],
    ['WhatsApp', `+${input.phoneWa}`],
    ['Email', input.email ?? '-'],
    ['Jenjang Anak', input.childGrade],
    ['Mata Pelajaran', input.subjectsInterested.join(', ')],
    ['Area', `${input.area}${input.areaDetail ? ` (${input.areaDetail})` : ''}`],
    ['Pesan', input.message ?? '-'],
    ['Source Page', input.sourcePage ?? '-'],
  ];

  const rowsHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5A6577;font-weight:600;vertical-align:top">${escapeHtml(
          k,
        )}</td><td style="padding:6px 12px;color:#0A1E3D">${escapeHtml(v)}</td></tr>`,
    )
    .join('');

  return `<!doctype html>
<html lang="id"><body style="font-family:Inter,system-ui,sans-serif;background:#f5f7fa;padding:24px;color:#0A1E3D">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 4px 20px rgba(10,30,61,0.08)">
    <h1 style="margin:0 0 8px 0;font-size:20px;color:#0A1E3D">Lead Baru, Teman Tutor</h1>
    <p style="margin:0 0 16px 0;font-size:13px;color:#5A6577">Submission baru via form konsultasi.</p>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tbody>${rowsHtml}</tbody>
    </table>
  </div>
</body></html>`;
}

export async function POST(req: Request) {
  // 1. Rate limit by IP
  const ip = getClientIp(req);
  const limit = rateLimit(`leads:${ip}`, MAX_REQ_PER_HOUR, ONE_HOUR_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Terlalu banyak percobaan. Silakan coba lagi nanti atau chat WhatsApp.' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((limit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  // 2. Parse JSON safely
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body tidak valid' }, { status: 400 });
  }

  // 3. Validate schema (also runs the honeypot check)
  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const message = first?.message ?? 'Form tidak valid';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // 4. Honeypot, schema already rejects non-empty, but double-check.
  if (parsed.data.website) {
    // Silently drop spam bots (return 200 to avoid signaling).
    return NextResponse.json({ ok: true });
  }

  // 5. Send email via Resend (if configured)
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (apiKey && to && from) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to,
        replyTo: parsed.data.email,
        subject: `Lead Baru: ${parsed.data.fullName} (${parsed.data.area})`,
        html: renderEmailHtml(parsed.data),
      });
    } catch (err) {
      // Don't fail user submission if email fails, log for ops.
      console.error('[leads] Resend send failed:', err);
    }
  } else if (process.env.NODE_ENV !== 'production') {
    // Dev convenience: log payload so we can verify the flow.
    console.info('[leads] (dev) lead received (Resend not configured):', {
      name: parsed.data.fullName,
      area: parsed.data.area,
      subjects: parsed.data.subjectsInterested,
    });
  } else {
    console.warn('[leads] RESEND_API_KEY/LEAD_NOTIFICATION_EMAIL not set, email skipped');
  }

  // 6. (Phase 2), INSERT into Supabase `leads` table here.

  return NextResponse.json({ ok: true });
}

// Reject other methods cleanly.
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
