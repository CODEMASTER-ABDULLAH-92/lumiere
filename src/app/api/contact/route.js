// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      phone,
      subject,
      message,
      preferredContact 
    } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Name, email, and message are required." 
        }),
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Please enter a valid email address." 
        }),
        { status: 400 }
      );
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (err) {
      console.error("SMTP Verify Failed:", err.message);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email service is temporarily unavailable. Please try again later." 
        }),
        { status: 500 }
      );
    }

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Lumière Beauty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✨ Thank You for Contacting Lumière Beauty",
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #FEFCFA; padding: 40px 30px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1B1613; font-size: 28px; margin: 0; letter-spacing: 2px;">LUMIÈRE</h1>
            <p style="color: #8B6F47; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-top: 5px;">Beauty</p>
          </div>
          
          <h2 style="color: #1B1613; font-size: 20px; font-weight: normal;">Dear ${name},</h2>
          
          <p style="color: #5c5248; font-size: 14px; line-height: 1.8;">
            Thank you for reaching out to Lumière Beauty. We've received your message and our team will get back to you within <strong>24-48 hours</strong>.
          </p>
          
          <div style="background-color: #F4EAE3; padding: 20px; margin: 25px 0; border-left: 3px solid #8B6F47;">
            <h3 style="color: #1B1613; font-size: 14px; margin-top: 0; letter-spacing: 2px; text-transform: uppercase;">Your Message Details:</h3>
            <p style="color: #5c5248; font-size: 13px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="color: #5c5248; font-size: 13px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${phone ? `<p style="color: #5c5248; font-size: 13px; margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${subject ? `<p style="color: #5c5248; font-size: 13px; margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
            <p style="color: #5c5248; font-size: 13px; margin: 5px 0;"><strong>Message:</strong> ${message}</p>
          </div>
          
          <p style="color: #5c5248; font-size: 14px; line-height: 1.8;">
            In the meantime, feel free to:
          </p>
          
          <div style="margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/all_products" style="display: inline-block; padding: 12px 24px; background-color: #1B1613; color: #F4EAE3; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-right: 10px; margin-bottom: 10px;">Browse Products</a>
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about" style="display: inline-block; padding: 12px 24px; border: 1px solid #1B1613; color: #1B1613; text-decoration: none; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">About Us</a>
          </div>
          
          <p style="color: #5c5248; font-size: 14px; line-height: 1.8;">
            With love and radiance,<br>
            <strong style="color: #1B1613;">The Lumière Beauty Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e5d8cf; margin: 30px 0;">
          
          <p style="color: #9a8d80; font-size: 11px; text-align: center;">
            Lumière Beauty • Perth, Australia | FSD, PAK<br>
            infoabdullahdev92@gmail.com • +92 323 3381938
          </p>
        </div>
      `,
    });

    // Send notification to your team
    await transporter.sendMail({
      from: `"Lumière Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      subject: `📩 New Inquiry from ${name}`,
      html: `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1B1613; padding: 20px; text-align: center;">
            <h1 style="color: #F4EAE3; font-size: 24px; margin: 0; letter-spacing: 2px;">LUMIÈRE</h1>
            <p style="color: #8B6F47; font-size: 10px; letter-spacing: 3px; margin: 5px 0 0;">New Contact Form Submission</p>
          </div>
          
          <div style="background-color: #FEFCFA; padding: 30px; border: 1px solid #e5d8cf;">
            <div style="background-color: #F4EAE3; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1B1613; font-size: 14px; margin-top: 0; letter-spacing: 2px;">👤 Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 10px; color: #5c5248; font-size: 13px;"><strong>Name:</strong></td>
                  <td style="padding: 6px 10px; color: #1B1613; font-size: 13px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 10px; color: #5c5248; font-size: 13px;"><strong>Email:</strong></td>
                  <td style="padding: 6px 10px; color: #1B1613; font-size: 13px;"><a href="mailto:${email}" style="color: #8B6F47;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 6px 10px; color: #5c5248; font-size: 13px;"><strong>Phone:</strong></td>
                  <td style="padding: 6px 10px; color: #1B1613; font-size: 13px;"><a href="tel:${phone}" style="color: #8B6F47;">${phone}</a></td>
                </tr>` : ''}
                ${preferredContact ? `
                <tr>
                  <td style="padding: 6px 10px; color: #5c5248; font-size: 13px;"><strong>Preferred Contact:</strong></td>
                  <td style="padding: 6px 10px; color: #1B1613; font-size: 13px;">${preferredContact}</td>
                </tr>` : ''}
              </table>
            </div>
            
            <div style="background-color: #F4EAE3; padding: 20px; margin-bottom: 20px;">
              <h3 style="color: #1B1613; font-size: 14px; margin-top: 0; letter-spacing: 2px;">📋 Inquiry Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                                ${subject ? `
                <tr>
                  <td style="padding: 6px 10px; color: #5c5248; font-size: 13px;"><strong>Subject:</strong></td>
                  <td style="padding: 6px 10px; color: #1B1613; font-size: 13px;">${subject}</td>
                </tr>` : ''}
              </table>
            </div>
            
            <div style="background-color: #F4EAE3; padding: 20px;">
              <h3 style="color: #1B1613; font-size: 14px; margin-top: 0; letter-spacing: 2px;">💬 Message</h3>
              <p style="color: #1B1613; font-size: 13px; line-height: 1.8; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p style="color: #9a8d80; font-size: 11px; text-align: center; margin-top: 15px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you within 24-48 hours." 
      }), 
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Something went wrong. Please try again or email us directly at hello@lumiere-beauty.com" 
      }),
      { status: 500 }
    );
  }
}