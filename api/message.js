import { Resend } from "resend";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const sender = (process.env.SENDER_EMAIL || "").trim();
  const recipientEmail = "smusso1126@gmail.com";

  if (!apiKey || !sender) {
    return res.status(500).json({
      error: "Configurazione mancante",
      message: "Il servizio email non è configurato correttamente.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        error: "Dati non validi",
        message: "Il payload inviato non è un JSON valido.",
      });
    }
  }
  body = body || {};

  const { nome, cognome, messaggio } = body;

  if (!nome || !cognome || !messaggio) {
    return res.status(400).json({
      error: "Dati mancanti",
      message: "Nome, cognome e messaggio sono obbligatori.",
    });
  }

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from: sender,
    to: recipientEmail,
    subject: `💌 Messaggio da ${nome} ${cognome}`,
    html: `
      <!DOCTYPE html>
      <html lang="it">
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="margin:0;padding:0;background:#f7f2e8;font-family:'Lato',Arial,sans-serif;color:#06415c;line-height:1.6;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f2e8;">
          <tr>
            <td align="center" style="padding:24px 12px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#F4EBD9;border-radius:12px;overflow:hidden;">
                <tr>
                  <td style="background:linear-gradient(135deg,#06415c,#318cb6);color:#ffffff;padding:36px 24px;text-align:center;">
                    <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;letter-spacing:0.5px;color:#ffffff;">💌 Un messaggio per voi</h1>
                    <p style="margin:8px 0 0;font-size:15px;color:#ffffff;">Carlo &amp; Francesca · Matrimonio 11 Luglio 2026</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 24px;background:#F4EBD9;">
                    <p style="margin:0 0 8px;font-size:15px;color:#06415c;"><strong>Da:</strong> ${nome} ${cognome}</p>
                    <div style="background:#06415c;border-radius:8px;padding:20px 24px;margin-top:16px;">
                      <p style="margin:0;font-size:16px;color:#ffffff;line-height:1.8;white-space:pre-wrap;">${messaggio}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 12px 22px;text-align:center;color:#06415c;font-size:13px;background:#F4EBD9;">
                    Ricevuto il: ${new Date().toLocaleString("it-IT", {
                      timeZone: "Europe/Rome",
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  });

  if (result?.error) {
    return res.status(502).json({
      error: "Errore del servizio email",
      message: "Non siamo riusciti a inviare il messaggio. Riprova tra poco.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Messaggio inviato con successo!",
  });
}
