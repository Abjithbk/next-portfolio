import { NextResponse } from "next/server";

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

        // 2. Check for Web3Forms Key
        const web3key = process.env.WEB3FORMS_ACCESS_KEY;
        if (!web3key) {
            console.error('❌ WEB3FORMS_ACCESS_KEY is missing in .env.local');
            return NextResponse.json({
                success: false,
                error: 'Server configuration error'
            }, { status: 500 });
        }

        // 3. Send Email via Web3Forms
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json' // 👈 Added this to force JSON response
            },
            body: JSON.stringify({
                access_key: web3key,
                name,
                email,
                message,
                subject: `New portfolio Message from ${name}`,
                replyto: email,
            }),
        });

        // 4. Safely read the response
        const responseText = await res.text();
        console.log('📧 WEB3FORMS Raw response:', responseText);

        let result;
        try {
            // ✅ FIX: We actually parse the text into a JSON object now!
            result = JSON.parse(responseText);
        } catch (e) {
            console.error('❌ Web3Forms returned HTML instead of JSON. Your Access Key is likely invalid or unverified.');
            return NextResponse.json({ 
                success: false, 
                error: 'Email provider error' 
            }, { status: 500 });
        }

        // 5. Return the final result
        if (result.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ 
                success: false, 
                error: result.message || 'Failed to send email' 
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ 
            success: false, 
            error: 'Internal Server Error' 
        }, { status: 500 });
    }
}