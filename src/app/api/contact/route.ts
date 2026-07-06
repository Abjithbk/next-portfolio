import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // 1. Basic Validation
        if (!name || !email || !message) {
            return NextResponse.json({
                success: false,
                error: "Missing required fields"
            }, { status: 400 });
        }

        // 2. Check for Resend API Key
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({
                success: false,
                error: 'Server configuration error'
            }, { status: 500 });
        }

        // 3. Send Email via Resend
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', 
            to: ['bkabjith2@gmail.com'], 
            replyTo: email, 
            subject: `New Portfolio Message from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF6B35;">New Contact Form Submission</h2>
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p><strong>From:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">
                        This email was sent from your portfolio contact form.
                    </p>
                </div>
            `,
        });
        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ 
            success: false, 
            error: 'Failed to send email' 
        }, { status: 500 });
    }
}