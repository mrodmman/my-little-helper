// ============================================================
// KRAKEN VAULT — EMAIL HTML BUILDER
// Replace LOGO_URL with your hosted logo image URL
// e.g. https://krakenvault.com/assets/logo.png
// ============================================================

const FROM_NAME = 'Matt @ Kraken Vault';
const BRAND_URL = 'https://krakenvault.com';

function buildEmail({ seriesLabel, headline, headlineAccent, body, ctaText, ctaUrl, logoUrl }) {
  const LOGO_URL = logoUrl || 'https://i.ibb.co/607fGNdR/file-45.jpg';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>Kraken Vault</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">

<!-- Preheader (hidden) -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
${headlineAccent || headline}
</div>

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f4;padding:24px 0;">
<tr><td align="center">

  <!-- Card -->
  <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:4px;overflow:hidden;">

    <!-- Top bar -->
    <tr>
      <td style="background:#0A8FE8;height:5px;font-size:0;line-height:0;">&nbsp;</td>
    </tr>

    <!-- Header -->
    <tr>
      <td style="padding:24px 32px;border-bottom:1px solid #f0f0f0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td width="48" valign="middle">
              ${LOGO_URL !== 'YOUR_LOGO_URL_HERE'
                ? `<img src="${LOGO_URL}" width="44" height="44" alt="Kraken Vault" style="display:block;border-radius:4px;"/>`
                : `<div style="width:44px;height:44px;background:#0A8FE8;border-radius:4px;display:inline-flex;align-items:center;justify-content:center;font-family:Arial Black,sans-serif;font-size:18px;font-weight:900;color:#fff;text-align:center;line-height:44px;">K</div>`
              }
            </td>
            <td style="padding-left:12px;" valign="middle">
              <div style="font-family:Arial Black,Arial,sans-serif;font-size:16px;font-weight:900;letter-spacing:2px;color:#0a0a0a;text-transform:uppercase;line-height:1.2;">Kraken Vault</div>
              <div style="font-family:Arial,sans-serif;font-size:9px;letter-spacing:4px;color:#0A8FE8;text-transform:uppercase;margin-top:3px;">Build The System</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:32px 32px 24px;">

        <!-- Series badge -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
          <tr>
            <td width="8" valign="middle">
              <div style="width:7px;height:7px;border-radius:50%;background:#0A8FE8;"></div>
            </td>
            <td style="padding-left:7px;">
              <span style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0A8FE8;">${seriesLabel}</span>
            </td>
          </tr>
        </table>

        <!-- Headline -->
        <div style="font-family:Arial Black,Arial,sans-serif;font-size:22px;font-weight:900;color:#0a0a0a;line-height:1.25;text-transform:uppercase;letter-spacing:-0.3px;margin-bottom:6px;">
          ${headline}
        </div>
        ${headlineAccent ? `<div style="font-family:Arial Black,Arial,sans-serif;font-size:22px;font-weight:900;color:#0A8FE8;line-height:1.25;text-transform:uppercase;letter-spacing:-0.3px;margin-bottom:20px;">${headlineAccent}</div>` : '<div style="margin-bottom:20px;"></div>'}

        <!-- Divider -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
          <tr>
            <td style="height:1px;background:#f0f0f0;"></td>
            <td width="8" style="padding:0 8px;text-align:center;vertical-align:middle;">
              <div style="width:6px;height:6px;border-radius:50%;background:#0A8FE8;display:inline-block;"></div>
            </td>
            <td style="height:1px;background:#f0f0f0;"></td>
          </tr>
        </table>

        <!-- Copy -->
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.75;">
          ${body}
        </div>

        <!-- CTA -->
        <table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 24px;">
          <tr>
            <td style="background:#0A8FE8;border-radius:3px;">
              <a href="${ctaUrl || BRAND_URL}" style="display:inline-block;padding:12px 28px;font-family:Arial Black,Arial,sans-serif;font-size:11px;font-weight:900;letter-spacing:2.5px;text-transform:uppercase;color:#ffffff;text-decoration:none;">${ctaText || 'Start Building →'}</a>
            </td>
          </tr>
        </table>

        <!-- Signature -->
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#777;line-height:1.7;margin-top:8px;">
          Talk soon,<br/>
          <span style="font-family:Arial Black,Arial,sans-serif;font-weight:900;color:#0a0a0a;letter-spacing:1px;font-size:13px;">MATT</span><br/>
          <span style="font-family:Arial Black,Arial,sans-serif;font-size:10px;color:#0A8FE8;letter-spacing:2px;text-transform:uppercase;">Kraken Vault</span>
        </div>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:14px 32px;border-top:1px solid #f0f0f0;background:#fafafa;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="font-family:Arial,sans-serif;font-size:11px;color:#aaa;">
              © 2026 Kraken Vault · Matt's Automation Lab
            </td>
            <td align="right" style="font-family:Arial,sans-serif;font-size:11px;">
              <a href="#" style="color:#0A8FE8;text-decoration:none;margin-left:14px;">Unsubscribe</a>
              <a href="#" style="color:#0A8FE8;text-decoration:none;margin-left:14px;">View in browser</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
  <!-- /Card -->

</td></tr>
</table>
<!-- /Wrapper -->

</body>
</html>`;
}

module.exports = { buildEmail };
