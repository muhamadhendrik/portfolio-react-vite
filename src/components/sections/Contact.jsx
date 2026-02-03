import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { contactService } from '../../services/contactService';

const Contact = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await contactService.submitContact(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile?.email || 'hello@muhamadhendrik.dev',
      href: `mailto:${profile?.email || 'hello@muhamadhendrik.dev'}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile?.phone || '+62 812 3456 7890',
      href: `tel:${profile?.phone || '+6281234567890'}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile?.location || 'Jakarta, Indonesia',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, href: profile?.github_url || '#', label: 'GitHub' },
    { icon: Linkedin, href: profile?.linkedin_url || '#', label: 'LinkedIn' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-4 text-4xl font-bold md:text-5xl">
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-400">
            Have a project in mind or just want to chat? Feel free to reach out!
          </motion.p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="mb-6 text-2xl font-bold">Let's Connect</h3>
              <p className="mb-8 text-gray-400">
                I'm always open to discussing new projects, creative ideas, or opportunities
                to be part of your vision. Drop me a message and I'll get back to you ASAP!
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 transition-colors glass-card hover:bg-white/10 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-full bg-gradient-to-br from-primary-color/20 to-secondary-color/20 group-hover:scale-110">
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{info.label}</p>
                    <p className="font-medium text-white">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-lg font-semibold">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-12 h-12 transition-colors rounded-full glass-card hover:bg-white/10"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 glass-card"
          >
            <motion.h3 variants={itemVariants} className="mb-6 text-2xl font-bold">
              Send a Message
            </motion.h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:outline-none focus:border-primary"
                  placeholder="John Doe"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:outline-none focus:border-primary"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 transition-colors border rounded-lg bg-white/5 border-white/10 focus:outline-none focus:border-primary"
                  placeholder="Project Inquiry"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block mb-2 text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 transition-colors border rounded-lg resize-none bg-white/5 border-white/10 focus:outline-none focus:border-primary"
                  placeholder="Tell me about your project..."
                />
              </motion.div>

              {error && (
                <div className="text-sm text-red-400">{error}</div>
              )}

              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center w-full gap-2 px-8 py-4 font-semibold text-white transition-all rounded-lg bg-gradient-to-r from-primary-color to-secondary-color hover:shadow-lg hover:shadow-primary-color/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white"
                      />
                      Sending...
                    </>
                  ) : submitted ? (
                    <>
                      <span>✓</span> Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
