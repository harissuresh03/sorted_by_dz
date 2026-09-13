'use client';
import { FormEvent, useRef, useState } from 'react';
import { config } from '@/lib/data';
import Button from '@/components/button';   // ✅ correct

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
      className="relative mt-0 flex h-full w-full max-w-none flex-col overflow-hidden rounded-3xl border-2 border-teal/25 bg-white p-6 shadow-xl before:absolute before:inset-x-0 before:top-0 before:h-2 before:bg-gradient-to-r before:from-teal before:via-mint before:to-teal dark:border-teal/40 dark:bg-[#121c33] md:p-8"
    >
      <div className="min-w-0 flex-1 space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        <label className="text-sm font-bold text-navy dark:text-white">
          Business / provider name
          <input
            required
            name="business"
            className="mt-2 w-full rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:focus:border-mint"
          />
        </label>
        <label className="text-sm font-bold text-navy dark:text-white">
          Contact name
          <input
            required
            name="contact"
            className="mt-2 w-full rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:focus:border-mint"
          />
        </label>
        <label className="text-sm font-bold text-navy dark:text-white">
          Phone / WhatsApp
          <input
            required
            name="phone"
            className="mt-2 w-full rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:focus:border-mint"
          />
        </label>
        <label className="text-sm font-bold text-navy dark:text-white">
          Service area
          <input
            required
            name="area"
            placeholder="Town, state, or region"
            className="mt-2 w-full rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:placeholder:text-white/40 dark:focus:border-mint"
          />
        </label>
        <label className="text-sm font-bold text-navy dark:text-white md:col-span-2">
          Supporting files (optional)
          <input
            ref={fileInput}
            name="attachment"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={selectFiles}
            className="mt-2 block w-full rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-teal file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-navy focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:hover:file:bg-mint dark:hover:file:text-navy"
          />
          {files.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm font-medium text-navy dark:text-white">
              {files.map((file) => (
                <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-3">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="cursor-pointer shrink-0 font-bold text-red-600 hover:text-red-800 dark:text-red-400"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
          {oversizedFiles.length > 0 && (
            <p className="mt-3 text-sm font-bold text-red-600 dark:text-red-400">
              {oversizedFiles.map((file) => file.name).join(', ')} must be 10 MB or smaller.
            </p>
          )}
        </label>
        <label className="text-sm font-bold text-navy dark:text-white md:col-span-2">
          What services do you offer?
          <textarea
            required
            name="offer"
            rows={5}
            placeholder="Please include your specialty and anything useful to know."
            className="mt-2 w-full resize-y rounded-xl border-2 border-teal/25 bg-white px-4 py-3 font-normal text-navy outline-none transition-colors placeholder:text-navy/40 focus:border-teal focus:ring-2 focus:ring-mint/40 dark:border-teal/40 dark:bg-[#0c1527] dark:text-white dark:placeholder:text-white/40 dark:focus:border-mint"
          />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Introduce your service'}
        </Button>
        <Button type="button" variant="secondary" onClick={whatsapp}>
          Continue via WhatsApp ↗
        </Button>
      </div>
      {status === 'sent' && (
        <p className="mt-4 text-sm font-bold text-teal dark:text-mint">
          Thanks — your introduction has been sent. DZ will be in touch.
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-sm font-bold text-red-600 dark:text-red-400">
          Email could not be sent. Please try WhatsApp or contact DZ directly.
        </p>
      )}
      <small className="mt-4 block font-medium text-navy/70 dark:text-white/70">
        Submitting does not guarantee a partnership or recommendation.
      </small>
    </form>
  );
}
