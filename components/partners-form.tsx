'use client';
import { FormEvent, useRef, useState } from 'react';
import { config } from '@/lib/data';
import { Button } from '@/components/button';

export function PartnersForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [files, setFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);

  function selectFiles(event: React.ChangeEvent<HTMLInputElement>) {
    setFiles(Array.from(event.target.files || []));
  }

  function removeFile(fileToRemove: File) {
    const remainingFiles = files.filter((file) => file !== fileToRemove);
    setFiles(remainingFiles);
    if (fileInput.current) {
      const transfer = new DataTransfer();
      remainingFiles.forEach((file) => transfer.items.add(file));
      fileInput.current.files = transfer.files;
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (oversizedFiles.length > 0) return;
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
      setFiles([]);
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
          Supporting files (optional)
          <input
            ref={fileInput}
            name="attachment"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={selectFiles}
            className="mt-2 block w-full rounded border border-slate-300 bg-white px-3 py-3 font-normal text-slate-600 outline-none file:mr-4 file:rounded file:border-0 file:bg-teal file:px-3 file:py-2 file:font-bold file:text-white focus:border-teal focus:ring-2 focus:ring-mint/40"
          />
          {files.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm font-normal text-slate-600">
              {files.map((file) => (
                <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="shrink-0 font-bold text-red-700 hover:text-red-900"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          {oversizedFiles.length > 0 && (
            <p className="mt-3 text-sm font-bold text-red-700">
              {oversizedFiles.map((file) => file.name).join(', ')} must be 10 MB or smaller.
            </p>
          )}
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
