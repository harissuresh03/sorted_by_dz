'use client';
import { FormEvent, useState } from 'react';
import { config } from '@/lib/data';
import { Button } from '@/components/button';

export function PartnersForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/partners', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error();
      setStatus('sent');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  function whatsapp() {
    const form = document.getElementById('partners-form') as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    const message = `Hello DZ, I’d like to introduce my service.\n\nBusiness: ${data.business || ''}\nContact: ${
      data.contact || ''
    }\nPhone: ${data.phone || ''}\nService area: ${data.area || ''}\nServices: ${data.offer || ''}`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      id="partners-form"
      onSubmit={submit}
      className="mt-10 max-w-2xl rounded-lg border-t-4 border-teal bg-white p-6 shadow-xl md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">
          Business / provider name
          <input
            required
            name="business"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700 md:col-span-2">
          Supporting file (optional)
          <input
            name="attachment"
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            className="mt-2 block w-full rounded border border-slate-300 bg-white px-3 py-3 font-normal text-slate-600 outline-none file:mr-4 file:rounded file:border-0 file:bg-teal file:px-3 file:py-2 file:font-bold file:text-white focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Contact name
          <input
            required
            name="contact"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Phone / WhatsApp
          <input
            required
            name="phone"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Service area
          <input
            required
            name="area"
            placeholder="Town, state, or region"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700 md:col-span-2">
          What services do you offer?
          <textarea
            required
            name="offer"
            rows={5}
            placeholder="Please include your specialty and anything useful to know."
            className="mt-2 w-full resize-y rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Introduce your service'}
        </Button>
        <Button type="button" variant="secondary" onClick={whatsapp}>
          Continue via WhatsApp ↗
        </Button>
      </div>
      {status === 'sent' && (
        <p className="mt-4 text-sm font-bold text-teal">
          Thanks — your introduction has been sent. DZ will be in touch.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm font-bold text-red-700">
          Email could not be sent. Please try WhatsApp or contact DZ directly.
        </p>
      )}
      <small className="mt-4 block text-slate-500">
        Submitting does not guarantee a partnership or recommendation.
      </small>
    </form>
  );
}
