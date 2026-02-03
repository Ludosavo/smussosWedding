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
  const coupleEmail = (process.env.RSVP_NOTIFICATION_EMAIL || "").trim();

  if (!apiKey || !sender || !coupleEmail) {
    return res.status(500).json({
      error: "Configurazione mancante",
      message:
        "Il servizio email non è configurato correttamente. Contatta gli amministratori.",
    });
  }

  // Parse body safely (avoids hard crashes if body is undefined/string)
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

  const { nome, cognome, email, telefono, allergie } = body;

  if (!nome || !cognome || !email) {
    return res.status(400).json({
      error: "Dati mancanti",
      message: "Nome, cognome ed email sono obbligatori",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Email non valida",
      message: "Inserisci un indirizzo email valido",
    });
  }
      
  const resend = new Resend(apiKey);

    // Send confirmation email to guest
    const guestEmailPromise = resend.emails.send({
    from: sender,
    to: email,
    subject: "Conferma form - Matrimonio Carlo & Francesca",
    html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
        </head>
        <body style="margin:0;padding:0;background: #F4EBD9 ;font-family:'Lato',Arial,sans-serif;color: #06415c ;line-height:1.6;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f7f2e8;">
            <tr>
              <td align="center" style="padding:24px 12px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background: #F4EBD9;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="background:linear-gradient(135deg, #06415c, #318cb6);color: #ffffff;padding:36px 24px;text-align:center;">
                      <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:30px;letter-spacing:0.5px; color: #ffffff">🍷 Carlo & Francesca 🍷</h1>
                      <p style="margin:8px 0 0;font-size:15px; color: #ffffff">Matrimonio · 11 Luglio 2026</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:28px 24px 16px;background: #F4EBD9;">
                      <h2 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:24px; color: #06415c">Grazie per la conferma, ${nome}!</h2>
                      <p style="margin:0 0 14px;font-size:16px;color: #06415c">Siamo felicissimi che parteciperai al nostro matrimonio. Non vediamo l'ora di condividere con te questo giorno speciale!</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 24px 20px;background: #F4EBD9;">
                      <div style="background: #06415c;border-left:4px solid #ffffff;padding:16px 16px 14px;border-radius:8px;margin-bottom:18px;">
                        <h3 style="margin:0 0 10px;color: #ffffff;font-size:18px;">📍 Dettagli dell'Evento</h3>
                        <ul style="margin:0;padding:0;list-style:none;font-size:15px;">
                          <li style="padding:6px 0;border-bottom:1px solid #ffffff;"><strong>Data:</strong> Sabato, 11 Luglio 2026</li>
                          <li style="padding:6px 0;border-bottom:1px solid #ffffff;"><strong>Ora:</strong> 16:30</li>
                          <li style="padding:6px 0;border-bottom:1px solid #ffffff;"><strong>Cerimonia:</strong> Chiesa di SS. Felice e Agata</li>
                          <li style="padding:6px 0;border-bottom:1px solid #ffffff;"><strong>Indirizzo:</strong> Via XX Settembre, 59 - Oviglio (AL)</li>
                          <li style="padding:6px 0;"><strong>Ricevimento:</strong> Castello di Oviglio</li>
                        </ul>
                      </div>
                      <div style="background: #06415c ;border-left:4px solid #6bbbc4;padding:16px 16px 14px;border-radius:8px;margin-bottom:18px;">
                        <h3 style="margin:0 0 10px;color: #ffffff;font-size:18px;">✓ La Tua Conferma</h3>
                        <ul style="margin:0;padding:0;list-style:none;font-size:15px;">
                          <li style="padding:6px 0;border-bottom:1px solid #6bbbc4;"><strong>Nome:</strong> ${nome} ${cognome}</li>
                          <li style="padding:6px 0;border-bottom:1px solid #6bbbc4;"><strong>Email:</strong> ${email}</li>
                          ${telefono ? `<li style="padding:6px 0;border-bottom:1px solid #6bbbc4;"><strong>Telefono:</strong> ${telefono}</li>` : ""}
                          ${allergie ? `<li style="padding:6px 0;color:#ffffff;"><strong>Allergie/Note:</strong> ${allergie}</li>` : ""}
                        </ul>
                      </div>
                      <p style="margin:0 0 18px;font-size:15px;color: #ffffff">Se hai bisogno di modificare la tua conferma o hai domande, non esitare a contattarci.</p>
                      <p style="margin:0 0 10px;text-align:center;font-size:16px; color: #ffffff"><strong>A presto!</strong><br>Carlo & Francesca ❤️</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px 12px 22px;text-align:center;color: #06415c;font-size:13px;background: #F4EBD9;">
                      Questa email è stata inviata in risposta alla tua conferma di partecipazione al matrimonio di Carlo e Francesca.
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

    // Send notification email to couple
    const coupleEmailPromise = resend.emails.send({
    from: sender,
    to: coupleEmail,
    subject: `✓ Nuova conferma: ${nome} ${cognome}`,
    html:`
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #06415c;
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              background: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            }
            h2 {
              color: #06415c;
              border-bottom: 3px solid #06415c9f;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              padding: 12px;
              border-bottom: 1px solid #fcfcfc;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              min-width: 150px;
              color: #06415c;
            }
            .value {
              color: #06415c;
            }
            .timestamp {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #fcfcfc;
              color: #7b8788;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">      
            <div class="info-row">
              <span class="label">Nome Completo:</span>
              <span class="value">${nome} ${cognome}</span>
            </div>
            
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${email}</span>
            </div>
            
            ${
              telefono
                ? `
            <div class="info-row">
              <span class="label">Telefono:</span>
              <span class="value">${telefono}</span>
            </div>
            `
                : ""
            }
          
            ${
              allergie
                ? `
            <div class="info-row">
              <span class="label">Allergie/Note:</span>
              <span class="value">${allergie}</span>
            </div>
            `
                : ""
            }
            
            <div class="timestamp">
              Ricevuto il: ${new Date().toLocaleString("it-IT", {
                timeZone: "Europe/Rome",
                dateStyle: "full",
                timeStyle: "short",
              })}
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send notification email to couple
    const [guestResult, coupleResult] = await Promise.all([
    guestEmailPromise,
    coupleEmailPromise,
  ]);

  // IMPORTANT: fail if Resend returns error (it may not throw)
  if (guestResult?.error || coupleResult?.error) {
    return res.status(502).json({
      error: "Errore del servizio email",
      message:
        "Non siamo riusciti a inviare l'email. Riprova tra poco.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "RSVP confermato con successo!",
    emailSent: true,
  });
}
