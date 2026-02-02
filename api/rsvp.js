import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Use verified domain or fall back to Resend's testing domain
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'Carlo & Francesca <onboarding@resend.dev>'
const COUPLE_EMAIL = process.env.RSVP_NOTIFICATION_EMAIL || null

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check if Resend API key and couple email are configured
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured')
    return res.status(500).json({ 
      error: 'Configurazione mancante',
      message: 'Il servizio email non è configurato correttamente. Contatta gli amministratori.'
    })
  }

  if (!COUPLE_EMAIL) {
    console.error('RSVP_NOTIFICATION_EMAIL not configured')
    return res.status(500).json({
      error: 'Configurazione mancante',
      message: 'Email di notifica non configurata. Contatta gli amministratori.'
    })
  }
  
  try {
    const {nome, cognome, email, telefono, allergie} = req.body
    
    // Validation
    if (!nome || !cognome || !email) {
      return res.status(400).json({ 
        error: 'Dati mancanti',
        message: 'Nome, cognome, email e risposta sono obbligatori' 
      })
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Email non valida',
        message: 'Inserisci un indirizzo email valido' 
      })
    }
        
    // Send confirmation email to guest
    const guestEmail = resend.emails.send({
      from: SENDER_EMAIL,
      to: email,
      subject: 'Conferma RSVP - Matrimonio Carlo & Francesca',
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Lato', Arial, sans-serif;
              color: #2C2416;
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #6B1C23, #C45D3F);
              color: #FFFEF2;
              padding: 40px 20px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .header h1 {
              margin: 0;
              font-family: 'Playfair Display', Georgia, serif;
              font-size: 32px;
            }
            .content {
              background: #F4EBD9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .details {
              background: #FFFEF2;
              padding: 20px;
              border-left: 4px solid #6B1C23;
              margin: 20px 0;
              border-radius: 5px;
            }
            .details h3 {
              margin-top: 0;
              color: #6B1C23;
            }
            .details ul {
              list-style: none;
              padding: 0;
            }
            .details li {
              padding: 8px 0;
              border-bottom: 1px solid #F4EBD9;
            }
            .details li:last-child {
              border-bottom: none;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #756F65;
              font-size: 14px;
            }
            .icon {
              display: inline-block;
              margin-right: 8px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🍷 Carlo & Francesca 🍷</h1>
            <p style="margin: 10px 0 0;">Matrimonio · 11 Luglio 2026</p>
          </div>
          
          <div class="content">
            <h2>Grazie per la conferma, ${nome}!</h2>
            <p>Siamo felicissimi che parteciperai al nostro matrimonio. Non vediamo l'ora di condividere con te questo giorno speciale!</p>
            
            <div class="details">
              <h3>📍 Dettagli dell'Evento</h3>
              <ul>
                <li><strong>Data:</strong> Sabato, 11 Luglio 2026</li>
                <li><strong>Ora:</strong> 16:30</li>
                <li><strong>Cerimonia:</strong> Chiesa dei SS. Felice e Agata</li>
                <li><strong>Indirizzo:</strong> Via XX Settembre, 59 - Oviglio (AL)</li>
                <li><strong>Ricevimento:</strong> Castello di Oviglio</li>
              </ul>
            </div>
            
            <div class="details">
              <h3>✓ La Tua Conferma</h3>
              <ul>
                <li><strong>Nome:</strong> ${nome} ${cognome}</li>
                <li><strong>Email:</strong> ${email}</li>
                ${telefono ? `<li><strong>Telefono:</strong> ${telefono}</li>` : ''}
                ${allergie ? `<li><strong>Allergie/Note:</strong> ${allergie}</li>` : ''}
              </ul>
            </div>
            
            <p>Se hai bisogno di modificare la tua conferma o hai domande, non esitare a contattarci.</p>
            
            <p style="margin-top: 30px; text-align: center;">
              <strong>A presto!</strong><br>
              Carlo & Francesca ❤️
            </p>
          </div>
          
          <div class="footer">
            <p>Questa email è stata inviata in risposta alla tua conferma di partecipazione al matrimonio di Carlo e Francesca.</p>
          </div>
        </body>
        </html>
      `
    })
    
    // Send notification email to couple
    const coupleEmail = resend.emails.send({
      from: SENDER_EMAIL,
      to: COUPLE_EMAIL,
      subject: `✓ Nuova conferma: ${nome} ${cognome}`,
      reply_to: email,
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #2C2416;
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
              color: #6B1C23;
              border-bottom: 3px solid #C45D3F;
              padding-bottom: 10px;
            }
            .info-row {
              display: flex;
              padding: 12px;
              border-bottom: 1px solid #F4EBD9;
            }
            .info-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: bold;
              min-width: 150px;
              color: #6B1C23;
            }
            .value {
              color: #2C2416;
            }
            .timestamp {
              margin-top: 20px;
              padding-top: 20px;
              border-top: 2px solid #F4EBD9;
              color: #756F65;
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
            
            ${telefono ? `
            <div class="info-row">
              <span class="label">Telefono:</span>
              <span class="value">${telefono}</span>
            </div>
            ` : ''}
          
            ${allergie ? `
            <div class="info-row">
              <span class="label">Allergie/Note:</span>
              <span class="value">${allergie}</span>
            </div>
            ` : ''}
            
            <div class="timestamp">
              Ricevuto il: ${new Date().toLocaleString('it-IT', { 
                timeZone: 'Europe/Rome',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </div>
          </div>
        </body>
        </html>
      `
    })

    const [guestEmailResult, coupleEmailResult] = await Promise.all([guestEmail, coupleEmail])
    
    console.log('RSVP processed successfully:', { nome, cognome, email })
    console.log('Guest email ID:', guestEmailResult.data?.id)
    console.log('Couple email ID:', coupleEmailResult.data?.id)
    
    // Optional: Store in database (Vercel Postgres, Supabase, etc.)
    // await storeRSVP({ nome, cognome, email, telefono, numeroOspiti, allergie })
    
    return res.status(200).json({ 
      success: true, 
      message: 'RSVP confermato con successo!',
      emailSent: true
    })
    
  } catch (error) {
    console.error('RSVP Error:', error)
    
    // More specific error handling
    if (error.name === 'validation_error') {
      return res.status(400).json({ 
        error: 'Errore di validazione',
        message: error.message 
      })
    }
    
    // Handle Resend API errors
    if (error.message && error.message.includes('resend')) {
      return res.status(500).json({ 
        error: 'Errore del servizio email',
        message: 'Il servizio email non è disponibile al momento. Riprova più tardi.'
      })
    }
    
    return res.status(500).json({ 
      error: 'Errore durante l\'invio',
      message: 'Si è verificato un errore. Riprova più tardi o contattaci direttamente.'
    })
  }
}
