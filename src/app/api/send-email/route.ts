import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { to, subject, message, replyTo } = await request.json();

    // Əlaqə məlumatlarını oxu
    const contentPath = path.join(process.cwd(), 'src/data/content.json');
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    const contact = data.contact || {
      phone: '+994 12 123 45 67',
      email: 'info@batinogroup.com',
      address: 'Bakı, Azərbaycan',
      socialMedia: {
        facebook: 'https://facebook.com/batinogroup',
        linkedin: 'https://linkedin.com/company/batinogroup',
        instagram: 'https://instagram.com/batinogroup',
      },
    };

    // Email konfiqurasiyası (Gmail üçün nümunə)
    // Production-da environment variables istifadə edin
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
    });

    // Email göndər
    const info = await transporter.sendMail({
      from: `"BatinoGroup" <${process.env.SMTP_USER || 'noreply@batinogroup.com'}>`,
      to: to,
      subject: subject,
      replyTo: replyTo,
      html: `
        <!DOCTYPE html>
        <html lang="az">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <title>BatinoGroup - Mesajınıza Cavab</title>
          <!--[if mso]>
          <style type="text/css">
            body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
          </style>
          <![endif]-->
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f4;">
            <tr>
              <td style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Gradient -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                        <tr>
                          <td style="text-align: center;">
                            <!-- Logo/Brand -->
                            <div style="background-color: rgba(255, 255, 255, 0.2); display: inline-block; padding: 20px 40px; border-radius: 50px;">
                              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">BatinoGroup</h1>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Greeting -->
                  <tr>
                    <td style="padding: 40px 30px 20px;">
                      <h2 style="margin: 0 0 15px; color: #1a202c; font-size: 24px; font-weight: 600;">Hörmətli müştərimiz,</h2>
                      <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.6;">Mesajınız üçün təşəkkür edirik.</p>
                    </td>
                  </tr>

                  <!-- Message Content -->
                  <tr>
                    <td style="padding: 0 30px 30px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); border-radius: 12px; border-left: 4px solid #667eea;">
                        <tr>
                          <td style="padding: 25px;">
                            <div style="color: #2d3748; font-size: 15px; line-height: 1.8;">
                              ${message.replace(/\n/g, '<br>')}
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Contact Info -->
                  <tr>
                    <td style="padding: 0 30px 30px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f7fafc; border-radius: 12px; padding: 25px;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 20px; color: #4a5568; font-size: 15px; font-weight: 600;">Əlavə suallarınız varsa, bizimlə əlaqə saxlaya bilərsiniz:</p>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 10px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                      <td style="width: 30px; vertical-align: middle;">
                                        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                          <span style="color: #ffffff; font-size: 12px;">📞</span>
                                        </div>
                                      </td>
                                      <td style="vertical-align: middle;">
                                        <a href="tel:${contact.phone.replace(/\s/g, '')}" style="color: #2d3748; text-decoration: none; font-size: 15px; font-weight: 500;">${contact.phone}</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                      <td style="width: 30px; vertical-align: middle;">
                                        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                          <span style="color: #ffffff; font-size: 12px;">✉️</span>
                                        </div>
                                      </td>
                                      <td style="vertical-align: middle;">
                                        <a href="mailto:${contact.email}" style="color: #2d3748; text-decoration: none; font-size: 15px; font-weight: 500;">${contact.email}</a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding: 10px 0;">
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                      <td style="width: 30px; vertical-align: middle;">
                                        <div style="width: 24px; height: 24px; background-color: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                          <span style="color: #ffffff; font-size: 12px;">📍</span>
                                        </div>
                                      </td>
                                      <td style="vertical-align: middle;">
                                        <span style="color: #2d3748; font-size: 15px; font-weight: 500;">${contact.address}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- CTA Button -->
                  <tr>
                    <td style="padding: 0 30px 40px; text-align: center;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px; padding: 15px 40px;">
                            <a href="https://batinogroup.com" style="color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; display: inline-block;">Vebsaytımızı Ziyarət Edin</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding: 0 30px;">
                      <div style="border-top: 1px solid #e2e8f0;"></div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; text-align: center; background-color: #f7fafc;">
                      <!-- Social Media -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 25px;">
                        <tr>
                          <td style="padding: 0 8px;">
                            <a href="${contact.socialMedia.facebook}" style="text-decoration: none; display: inline-block;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                                    <span style="color: #ffffff; font-size: 20px; font-weight: bold; line-height: 40px;">f</span>
                                  </td>
                                </tr>
                              </table>
                            </a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="${contact.socialMedia.linkedin}" style="text-decoration: none; display: inline-block;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                                    <span style="color: #ffffff; font-size: 16px; font-weight: bold; line-height: 40px;">in</span>
                                  </td>
                                </tr>
                              </table>
                            </a>
                          </td>
                          <td style="padding: 0 8px;">
                            <a href="${contact.socialMedia.instagram}" style="text-decoration: none; display: inline-block;">
                              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; text-align: center; vertical-align: middle;">
                                    <span style="color: #ffffff; font-size: 20px; line-height: 40px;">📷</span>
                                  </td>
                                </tr>
                              </table>
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Copyright -->
                      <p style="margin: 0 0 10px; color: #718096; font-size: 14px; font-weight: 500;">© 2025 BatinoGroup. Bütün hüquqlar qorunur.</p>
                      <p style="margin: 0; color: #a0aec0; font-size: 13px;">Azərbaycanda aparıcı təchizat və alış-veriş şirkəti</p>
                      
                      <!-- Unsubscribe -->
                      <p style="margin: 20px 0 0; color: #a0aec0; font-size: 12px;">
                        Bu email sizə sorğunuza cavab olaraq göndərilib.
                      </p>
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

    console.log('Email sent:', info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to send email',
        details: 'Email konfiqurasiyasını yoxlayın. SMTP_HOST, SMTP_USER və SMTP_PASS environment variables təyin edilməlidir.'
      },
      { status: 500 }
    );
  }
}
