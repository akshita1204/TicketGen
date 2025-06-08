import nodemailer from "nodemailer"

export const sendMail=async(to,subject,text)
try{
   const transport=nodemailer.createTransport({
    host:process.env.MAILTRAP_SMTP_HOST,
    port:MAILTRAP_SMTP_PORT,
    secure:false,
    auth:
    {
        user:MAILTRAP_SMTP_USER,
        pass:MAILTRAP_SMTP_PASS,
    }
  });

  const info=await transporter.sendMail({
    from:'"Inngest TMS',
    to,
    subject,
    text,
  });
  console.log("Message send:", info.messageId);
  return info
}
catch(err)
{
console.log("Message send:", err.message);
throw err
}
