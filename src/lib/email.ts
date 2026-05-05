/**
 * Resend email helper.
 * Uses the Resend REST API directly — no package needed.
 * Domain: kbkcompanies.com (registered with Resend).
 */

import { getEnv } from "@/lib/env";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<void> {
  const env = getEnv();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${env.FROM_NAME} <${env.FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "unknown error");
    throw new Error(`Resend error ${res.status}: ${body}`);
  }
}

// ---- Email templates ----

export function verifyEmailTemplate(name: string, verifyUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0b1220;font-family:system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;padding:40px;border:1px solid #1f2937;">
        <tr><td>
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#60a5fa;margin:0 0 24px;">Kraken Vault</p>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 12px;color:#f1f5f9;">Verify your email</h1>
          <p style="color:#94a3b8;margin:0 0 24px;line-height:1.6;">
            Hey ${name || "there"} — click the button below to verify your email address and access The Kraken Vault.
          </p>
          <a href="${verifyUrl}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;">
            Verify my email
          </a>
          <p style="color:#475569;font-size:13px;margin:24px 0 0;line-height:1.6;">
            This link expires in 24 hours. If you didn't sign up, ignore this email.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function resetPasswordTemplate(name: string, resetUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0b1220;font-family:system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;padding:40px;border:1px solid #1f2937;">
        <tr><td>
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#60a5fa;margin:0 0 24px;">Kraken Vault</p>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 12px;color:#f1f5f9;">Reset your password</h1>
          <p style="color:#94a3b8;margin:0 0 24px;line-height:1.6;">
            Hey ${name || "there"} — click the button below to choose a new password. This link expires in 1 hour.
          </p>
          <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;">
            Reset my password
          </a>
          <p style="color:#475569;font-size:13px;margin:24px 0 0;line-height:1.6;">
            If you didn't request this, ignore this email — your password won't change.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function welcomeTemplate(name: string, vaultUrl: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#0b1220;font-family:system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1220;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;padding:40px;border:1px solid #1f2937;">
        <tr><td>
          <p style="font-size:12px;text-transform:uppercase;letter-spacing:0.2em;color:#60a5fa;margin:0 0 24px;">Kraken Vault</p>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 12px;color:#f1f5f9;">Welcome to The Vault 🦑</h1>
          <p style="color:#94a3b8;margin:0 0 24px;line-height:1.6;">
            Hey ${name || "there"} — you're in. 10 modules, 100+ lessons, the exact system for building income online.
          </p>
          <a href="${vaultUrl}" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:15px;">
            Enter The Vault
          </a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
