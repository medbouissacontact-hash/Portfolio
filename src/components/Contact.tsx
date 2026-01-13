import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageCircle, Linkedin, Send } from 'lucide-react';

export function Contact() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('form-name', 'contact');
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: 'medbouissa.contact@gmail.com', href: 'mailto:medbouissa.contact@gmail.com' },
    { icon: MessageCircle, label: 'WhatsApp', value: '+216 53 490 237', href: 'https://wa.me/21653490237' },
    { icon: Linkedin, label: 'LinkedIn', value: 'LinkedIn', href: 'https://www.linkedin.com/in/bouissa-mohamed-8aa172390/' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 px-4 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-cyan to-accent-lime rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <motion.a
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-accent-cyan/50 transition-all text-center group"
            >
              <contact.icon className="w-10 h-10 text-accent-cyan mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-bold mb-2">{contact.label}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{contact.value}</p>
            </motion.a>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          onSubmit={handleSubmit}
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <input name="bot-field" type="text" onChange={handleChange} />
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-bold mb-2">{t('contact.form.name')}</label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-accent-cyan focus:outline-none text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">{t('contact.form.email')}</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-accent-cyan focus:outline-none text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">{t('contact.form.subject')}</label>
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-accent-cyan focus:outline-none text-gray-900 dark:text-white"
              placeholder="Project inquiry"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">{t('contact.form.message')}</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:border-accent-cyan focus:outline-none text-gray-900 dark:text-white resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-lime text-black font-bold rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
          </motion.button>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500 text-green-700 dark:text-green-300 rounded-lg text-sm"
            >
              {t('contact.form.success')}
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/20 border border-red-500 text-red-700 dark:text-red-300 rounded-lg text-sm"
            >
              {t('contact.form.error')}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
