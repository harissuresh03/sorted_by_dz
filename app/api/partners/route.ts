import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const safe = (value: unknown) => (typeof value === 'string' ? value.trim().slice(0, 5000) : '');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const business = safe(formData.get('business'));
    const contact = safe(formData.get('contact'));
    const phone = safe(formData.get('phone'));
    const area = safe(formData.get('area'));
    const offer = safe(formData.get('offer'));
    const attachments = formData.getAll('attachment');

    if (!business || !contact || !phone || !area || !offer) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, OWNER_EMAIL } = process.env;
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !OWNER_EMAIL) {
      return NextResponse.json({ error: 'Email is not configured.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const mail = {
      from: `Sorted by DZ <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: contact.includes('@') ? contact : undefined,
      subject: `New partner introduction — ${business}`,
      text: `Business: ${business}\nContact: ${contact}\nPhone: ${phone}\nService area: ${area}\n\nServices offered:\n${offer}`,
      attachments: [] as { filename: string; content: Buffer; contentType?: string }[],
    };

    for (const attachment of attachments) {
      if (attachment instanceof File && attachment.size > 0) {
        if (attachment.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: 'File must be 10 MB or smaller.' }, { status: 400 });
        }
        mail.attachments.push({
          filename: attachment.name,
          content: Buffer.from(await attachment.arrayBuffer()),
          contentType: attachment.type || undefined,
        });
      }
    }

    await transporter.sendMail(mail);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send introduction.' }, { status: 500 });
  }
}
