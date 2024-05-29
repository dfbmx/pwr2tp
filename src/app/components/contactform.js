import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setStatus('Please complete the CAPTCHA.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captcha: captchaValue }),
      });

      const result = await response.json();
      setStatus(result.status);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('Error submitting form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 mb-5">
          <label htmlFor="name" className="font-semibold">Your Name:</label>
          <input name="name" id="name" type="text" className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2" placeholder="Name :" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="lg:col-span-6 mb-5">
          <label htmlFor="email" className="font-semibold">Your Email:</label>
          <input name="email" id="email" type="email" className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2" placeholder="Email :" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <div className="mb-5">
          <label htmlFor="subject" className="font-semibold">Your Question:</label>
          <input name="subject" id="subject" className="form-input w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2" placeholder="Subject :" value={formData.subject} onChange={handleChange} required />
        </div>

        <div className="mb-5">
          <label htmlFor="message" className="font-semibold">Your Comment:</label>
          <textarea name="message" id="message" className="form-input w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-amber-400 dark:border-gray-800 dark:focus:border-amber-400 focus:ring-0 mt-2 h-40" placeholder="Message :" value={formData.message} onChange={handleChange} required />
        </div>
      </div>

      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={(value) => setCaptchaValue(value)}
      />

      <button type="submit" id="submit" name="send" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-amber-400 hover:bg-amber-500 border-amber-400 hover:border-amber-500 text-white rounded-md">Send Message</button>
      {status && <p>{status}</p>}
    </form>
  );
}
