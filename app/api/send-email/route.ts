import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define inquiry types
type InquiryType = 'general' | 'language-course' | 'seminar' | 'volunteer' | 'partnership' | 'coaching' | 'studies-abroad';

// Email template generator based on inquiry type
function generateEmailTemplate(type: InquiryType, data: any): { subject: string; html: string; text: string } {
  const { name, email, phone, subject, message, courseLevel, courseLanguage } = data;

  const baseStyles = `
    body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; font-size: 15px; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(to right, #f59e0b, #ea580c); color: white; padding: 25px; border-radius: 8px 8px 0 0; }
    .header h2 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 25px; border: 1px solid #e5e7eb; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 18px; }
    .label { font-weight: bold; color: #f59e0b; font-size: 14px; margin-bottom: 5px; }
    .value { margin-top: 5px; font-size: 15px; }
    .badge { display: inline-block; padding: 6px 14px; background: #f59e0b; color: white; border-radius: 12px; font-size: 13px; font-weight: bold; }
    .reply-button { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(to right, #f59e0b, #ea580c); color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; }
    .reply-button:hover { background: linear-gradient(to right, #ea580c, #f59e0b); }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb; font-size: 13px; color: #6b7280; }
  `;

  const timestamp = new Date().toLocaleString('fr-FR', {
    timeZone: 'Africa/Tunis',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  let emailSubject = '';
  let headerIcon = '';
  let headerTitle = '';
  let specificFields = '';

  switch (type) {
    case 'language-course':
      emailSubject = `🎓 Demande de cours de langue - ${courseLanguage || 'N/A'} ${courseLevel || ''}`;
      headerIcon = '🎓';
      headerTitle = 'Nouvelle demande de cours de langue';
      specificFields = `
        ${courseLanguage ? `
        <div class="field">
          <div class="label">🌍 Langue demandée:</div>
          <div class="value"><span class="badge">${courseLanguage}</span></div>
        </div>
        ` : ''}
        ${courseLevel ? `
        <div class="field">
          <div class="label">📊 Niveau demandé:</div>
          <div class="value"><span class="badge">${courseLevel}</span></div>
        </div>
        ` : ''}
      `;
      break;

    case 'seminar':
      emailSubject = `📚 Demande d'information - Séminaire`;
      headerIcon = '📚';
      headerTitle = 'Demande d\'information sur un séminaire';
      specificFields = `
        <div class="field" style="background: #fef3c7; padding: 10px; border-radius: 4px; border-left: 4px solid #f59e0b;">
          <strong>Type d'enquête:</strong> Séminaire professionnel
        </div>
      `;
      break;

    case 'volunteer':
      emailSubject = `🌟 Demande de volontariat / Au Pair`;
      headerIcon = '🌟';
      headerTitle = 'Nouvelle demande de programme de volontariat';
      specificFields = `
        <div class="field" style="background: #dbeafe; padding: 10px; border-radius: 4px; border-left: 4px solid #3b82f6;">
          <strong>Type d'enquête:</strong> Programme de volontariat / Au Pair
        </div>
      `;
      break;

    case 'partnership':
      emailSubject = `🤝 Demande de partenariat`;
      headerIcon = '🤝';
      headerTitle = 'Nouvelle demande de partenariat';
      specificFields = `
        <div class="field" style="background: #dcfce7; padding: 10px; border-radius: 4px; border-left: 4px solid #22c55e;">
          <strong>Type d'enquête:</strong> Opportunité de partenariat
        </div>
      `;
      break;

    case 'coaching':
      emailSubject = `💼 Demande de coaching professionnel`;
      headerIcon = '💼';
      headerTitle = 'Nouvelle demande de coaching';
      specificFields = `
        <div class="field" style="background: #fce7f3; padding: 10px; border-radius: 4px; border-left: 4px solid #ec4899;">
          <strong>Type d'enquête:</strong> Coaching professionnel
        </div>
      `;
      break;

    case 'studies-abroad':
      emailSubject = `✈️ Demande d'information - Études à l'étranger`;
      headerIcon = '✈️';
      headerTitle = 'Demande d\'information sur les études à l\'étranger';
      specificFields = `
        <div class="field" style="background: #e0e7ff; padding: 10px; border-radius: 4px; border-left: 4px solid #6366f1;">
          <strong>Type d'enquête:</strong> Études à l'étranger
        </div>
      `;
      break;

    default: // general
      emailSubject = `📧 Contact général - ${subject}`;
      headerIcon = '📧';
      headerTitle = 'Nouveau message de contact';
      specificFields = '';
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2 style="margin: 0;">${headerIcon} ${headerTitle}</h2>
        </div>
        <div class="content">
          ${specificFields}
          
          <div class="field">
            <div class="label">👤 Nom:</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${email}" style="color: #f59e0b; text-decoration: none;">${email}</a></div>
          </div>
          
          ${phone ? `
          <div class="field">
            <div class="label">📱 Téléphone:</div>
            <div class="value">${phone}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">📋 Sujet:</div>
            <div class="value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="label">💬 Message:</div>
            <div class="value" style="white-space: pre-wrap; background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b;">${message}</div>
          </div>
          
          <a href="mailto:${email}?subject=RE: ${encodeURIComponent(subject)}" class="reply-button">📧 Répondre à ${name}</a>
          
          <div class="footer">
            <p><strong>📅 Date de soumission:</strong> ${timestamp}</p>
            <p style="color: #22c55e;">✅ Vous pouvez répondre directement à cet email pour contacter ${name}.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
${headerTitle}
${'='.repeat(50)}

${specificFields ? `Type: ${type}\n` : ''}
Nom: ${name}
Email: ${email}
${phone ? `Téléphone: ${phone}\n` : ''}
${courseLanguage ? `Langue: ${courseLanguage}\n` : ''}
${courseLevel ? `Niveau: ${courseLevel}\n` : ''}
Sujet: ${subject}

Message:
${message}

${'='.repeat(50)}
Date de soumission: ${timestamp}
Répondre à: ${email}
  `.trim();

  return { subject: emailSubject, html, text };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, inquiryType, courseLevel, courseLanguage } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Determine inquiry type (default to 'general')
    const type: InquiryType = inquiryType || 'general';

    // Create transporter with SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'ssl0.ovh.net',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // use SSL
      auth: {
        user: process.env.SMTP_USER || 'info@investinhuman.tn',
        pass: process.env.SMTP_PASS || 'investinvest2025.',
      },
    });

    // Generate email template based on inquiry type
    const emailTemplate = generateEmailTemplate(type, {
      name,
      email,
      phone,
      subject,
      message,
      courseLevel,
      courseLanguage,
    });

    // Email options
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER || 'info@investinhuman.tn'}>`,
      to: process.env.RECEIVER_EMAIL || 'info@investinhuman.tn',
      replyTo: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
