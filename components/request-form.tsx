'use client';
import { FormEvent, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, config } from '@/lib/data';
import { Button } from '@/components/button';

export function RequestForm() {
  const search = useSearchParams();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const initial = search.get('service') || '';
  const [service, setService] = useState(initial);
  const allServices = categories.flatMap((category) => category.items);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error();
      setStatus('sent');
      event.currentTarget.reset();
      setService('');
    } catch {
      setStatus('error');
    }
  }

  function whatsapp() {
    const form = document.getElementById('request-form') as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    const message = `Hello DZ, I’d like help with a service request.\n\nName: ${data.name || ''}\nContact: ${
      data.contact || ''
    }\nService: ${data.service || ''}\nDetails: ${data.description || ''}`;
    window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      id="request-form"
      onSubmit={submit}
      className="mt-10 max-w-2xl rounded-lg border-t-4 border-teal bg-white p-6 shadow-xl md:p-9"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm font-bold text-slate-700">
          Full Name
          <input
            required
            name="name"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700">
          Contact Details
          <input
            required
            name="contact"
            type="text"
            placeholder="Phone number or email"
            className="mt-2 w-full rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
        <label className="text-sm font-bold text-slate-700 md:col-span-2">
          Selected Service
          <select
            required
            name="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          >
            <option value="">Choose a service</option>
            {allServices.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold text-slate-700 md:col-span-2">
          Description
          <textarea
            required
            name="description"
            rows={5}
            placeholder="Tell DZ what you need, any timing, location, and useful details."
            className="mt-2 w-full resize-y rounded border border-slate-300 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
        </label>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </Button>
        <Button type="button" variant="secondary" onClick={whatsapp}>
          Continue via WhatsApp ↗
        </Button>
      </div>
      {status === 'sent' && <p className="mt-4 text-sm font-bold text-teal">Your enquiry has been sent. DZ will be in touch.</p>}
      {status === 'error' && (
        <p className="mt-4 text-sm font-bold text-red-700">
          Email could not be sent. Please try WhatsApp or contact DZ directly.
        </p>
      )}
    </form>
  );
}
