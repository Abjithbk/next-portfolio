import { NextResponse } from "next/server";

export async function POST(req:Request) {

    try {
        const body = await req.json()
        const {name,email,message} = body;

        const discordPayload = {
      content: "**New Portfolio Message!**",
      embeds: [
        {
          title: `Message from ${name || 'Anonymous'}`,
          color: 65535, // Cyan color to match your portfolio theme!
          fields: [
            {
              name: "Email",
              value: email || "No email provided",
              inline: false,
            },
            {
              name: "Message",
              value: message || "No message provided",
              inline: false,
            },
          ],
          footer: {
            text: "Portfolio Contact Form",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    if(process.env.DISCORD_WEBHOOK_URL) {
        await fetch(process.env.DISCORD_WEBHOOK_URL,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(discordPayload),
        });
    }

    if(process.env.WEB3FORMS_ACCESS_KEY) {
        const emailData = {
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name: name || "Anonymous",
            email: email,
            message: message,
            subject: `New Portfolio Message from ${name || 'Anonymous'}`,
        };

        await fetch('https://api.web3forms.com/submit', {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(emailData)
        });
    }
    return NextResponse.json({
        success: true,
        message:'Sent successfully'
    });
    }
    catch(err) {
        console.log(err)
        return NextResponse.json({
            success:false,
            message:"Server error"
        },{
            status:500
        })
    }
    
}