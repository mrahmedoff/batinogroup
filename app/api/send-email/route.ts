import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, message, replyTo } = await request.json();

    // Validation
    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Email, subject və message məcburidir' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: 'Düzgün email daxil edin' },
        { status: 400 }
      );
    }

    // Gmail credentials check
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const testMode = process.env.EMAIL_TEST_MODE === 'true';
    
    // Debug logging for Vercel
    console.log('Environment check:', {
      hasGmailUser: !!gmailUser,
      hasGmailPassword: !!gmailAppPassword,
      testMode,
      nodeEnv: process.env.NODE_ENV
    });
    
    // Test mode or no credentials - simulate email sending
    if (!gmailUser || !gmailAppPassword || testMode || process.env.NODE_ENV === 'production') {
      console.log('📧 Email Simulation (Test Mode)');
      console.log('From:', gmailUser || 'test@example.com');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('Message:', message);
      console.log('Reply-To:', replyTo);
      console.log('---');
      
      return NextResponse.json({
        success: true,
        message: 'Email göndərildi (Test mode - simulated)',
        data: {
          to,
          subject,
          sentAt: new Date().toISOString(),
          mode: 'test'
        }
      });
    }

    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Email options
    const mailOptions = {
      from: `BatinoGroup <${gmailUser}>`,
      to: to,
      subject: subject,
      replyTo: replyTo || gmailUser,
      html: createHtmlEmail(message),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email uğurla göndərildi',
      data: {
        messageId: info.messageId,
        to,
        subject,
        sentAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ Email sending error:', error);
    
    let errorMessage = 'Email not sent';
    let suggestion = 'Add EMAIL_TEST_MODE=true to .env.local file to use test mode';
    
    if (error.code === 'EAUTH') {
      errorMessage = 'Gmail authentication xətası. Email və App Password-u yoxlayın.';
      suggestion = 'Gmail hesabınızda 2-Step Verification aktiv edin və App Password yaradın.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'İnternet bağlantısı problemi.';
    } else if (error.responseCode === 550) {
      errorMessage = 'Alıcı email ünvanı mövcud deyil.';
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        suggestion: suggestion
      },
      { status: 500 }
    );
  }
}

// Create HTML email template
function createHtmlEmail(message: string): string {
  const currentYear = new Date().getFullYear();
  
  return `
<!DOCTYPE html>
<html lang="az">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>BatinoGroup - Professional Email</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f0f4f8; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Wrapper Table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f4f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.05); max-width: 600px;">
          
          <!-- Header with Logo and Pattern -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 50%, #1e3a8a 100%); padding: 0; position: relative;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 50px 40px; text-align: center; position: relative;">
                    <!-- Logo Circle -->
                    <div style="display: inline-block; width: 80px; height: 80px; background-color: rgba(255, 255, 255, 0.15); border-radius: 50%; margin-bottom: 20px; line-height: 80px; backdrop-filter: blur(10px); border: 2px solid rgba(255, 255, 255, 0.3);">
                      <span style="color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 2px;">B</span>
                    </div>
                    
                    <!-- Company Name -->
                    <h1 style="color: #ffffff; margin: 0; font-size: 36px; font-weight: 700; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      BatinoGroup
                    </h1>
                    
                    <!-- Tagline -->
                    <p style="color: rgba(255, 255, 255, 0.9); margin: 12px 0 0 0; font-size: 14px; font-weight: 400; letter-spacing: 0.5px;">
                      Supply Solutions and Engineering Services
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Decorative Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #2563eb 50%, #1e40af 100%);"></td>
          </tr>
          
          <!-- Content Section -->
          <tr>
            <td style="padding: 50px 40px;">
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <p style="color: #1e293b; font-size: 18px; font-weight: 600; margin: 0 0 8px 0;">
                  Hörmətli müştəri,
                </p>
                <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                  Thank you for your message. You can find our response below.
                </p>
              </div>
              
              <!-- Message Content Box -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #2563eb; border-radius: 8px; padding: 30px; margin: 30px 0;">
                <div style="color: #334155; font-size: 16px; line-height: 1.8; white-space: pre-wrap; font-weight: 400;">
${message}
                </div>
              </div>
              
              <!-- Call to Action -->
              <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #e2e8f0;">
                <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                  If you have additional questions, don't hesitate to contact us:
                </p>
                
                <!-- Contact Buttons -->
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0;">
                  <tr>
                    <td style="padding-right: 10px;">
                      <a href="mailto:info@batinogroup.az" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);">
                        📧 Email Göndər
                      </a>
                    </td>
                    <td>
                      <a href="tel:+994123456789" style="display: inline-block; background: #ffffff; color: #2563eb; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600; border: 2px solid #2563eb;">
                        📞 Zəng Et
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          
          <!-- Info Section -->
          <tr>
            <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Contact Info -->
                  <td width="50%" style="padding-right: 20px; vertical-align: top;">
                    <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin: 0 0 20px 0;">
                      📍 Contact Information
                    </h3>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Address:</strong><br>
                            Baku, Azerbaijan
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Email:</strong><br>
                            <a href="mailto:info@batinogroup.az" style="color: #2563eb; text-decoration: none;">info@batinogroup.az</a>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Telefon:</strong><br>
                            <a href="tel:+994123456789" style="color: #2563eb; text-decoration: none;">+994 12 XXX XX XX</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  
                  <!-- Working Hours -->
                  <td width="50%" style="padding-left: 20px; vertical-align: top; border-left: 1px solid #e2e8f0;">
                    <h3 style="color: #1e293b; font-size: 16px; font-weight: 700; margin: 0 0 20px 0;">
                      🕐 İş Saatları
                    </h3>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Bazar ertəsi - Cümə:</strong><br>
                            09:00 - 18:00
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 8px;">
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Şənbə:</strong><br>
                            10:00 - 15:00
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="color: #64748b; font-size: 14px; margin: 0; line-height: 1.6;">
                            <strong style="color: #475569;">Bazar:</strong><br>
                            <span style="color: #ef4444;">Bağlı</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Social Media -->
          <tr>
            <td style="background-color: #ffffff; padding: 30px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0 0 15px 0; font-weight: 600;">
                Bizi sosial şəbəkələrdə izləyin
              </p>
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 18px;">
                      f
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 18px;">
                      in
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="#" style="display: inline-block; width: 40px; height: 40px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 50%; text-align: center; line-height: 40px; text-decoration: none; color: #ffffff; font-size: 18px;">
                      IG
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 30px 40px; text-align: center;">
              <p style="color: rgba(255, 255, 255, 0.9); font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">
                © ${currentYear} BatinoGroup. Bütün hüquqlar qorunur.
              </p>
              <p style="color: rgba(255, 255, 255, 0.6); font-size: 12px; margin: 0; line-height: 1.6;">
                Bu email sizə BatinoGroup tərəfindən göndərilib.<br>
                Əgər bu emaili səhvən aldınızsa, lütfən nəzərə almayın.
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <a href="#" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 12px; margin: 0 10px;">Məxfilik Siyasəti</a>
                <span style="color: rgba(255, 255, 255, 0.3);">|</span>
                <a href="#" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 12px; margin: 0 10px;">İstifadə Şərtləri</a>
                <span style="color: rgba(255, 255, 255, 0.3);">|</span>
                <a href="#" style="color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 12px; margin: 0 10px;">Əlaqə</a>
              </div>
            </td>
          </tr>
          
        </table>
        
        <!-- Spacer -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
          <tr>
            <td style="padding: 20px; text-align: center;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                Bu email avtomatik olaraq yaradılıb. Lütfən bu emailə cavab verməyin.
              </p>
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
  `.trim();
}
