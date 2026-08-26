import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const safe = (value: unknown) => (typeof value === 'string' ? value.trim().slice(0, 5000) : '');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = safe(body.name);
    const contact = safe(body.contact);
    const service = safe(body.service);
    const description = safe(body.description);

    if (!name || !contact || !service || !description) {
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

    await transporter.sendMail({
      from: `Sorted by DZ <${SMTP_USER}>`,
      to: OWNER_EMAIL,
      replyTo: contact.includes('@') ? contact : undefined,
      subject: `New Sorted by DZ enquiry — ${service}`,
      text: `Full name: ${name}\nContact: ${contact}\nSelected service: ${service}\n\nDescription:\n${description}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Unable to send enquiry.' }, { status: 500 });
  }
}
