import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Code2, Terminal, Braces, Rocket } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';

const Hero = () => {
  const { profile, loading, error } = useProfile();

  // Fallback to default data while loading or on error
  const socialLinks = [
    { icon: Github, href: profile?.github_url || '#', label: 'GitHub' },
    { icon: Linkedin, href: profile?.linkedin_url || '#', label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile?.email || 'hello@example.com'}`, label: 'Email' },
    { icon: Code2, href: '#', label: 'Code' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  if (loading) {
    return (
      <section id="home" className="relative flex items-center justify-center min-h-screen pt-20 md:pt-10">
        <div className="text-center">Loading...</div>
      </section>
    );
  }

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen pt-20 overflow-hidden md:pt-10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl animate-float" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-2 text-sm border rounded-full bg-white/5 border-white/10">
                👋 Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Hi, I'm{' '}
              <span className="gradient-text">{profile?.name || 'Muhamad Hendrik'}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-6 text-xl text-gray-400 sm:text-2xl md:text-3xl"
            >
              {profile?.title || 'Full Stack Developer & Creative Technologist'}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="max-w-xl mb-8 text-base text-gray-500 sm:text-lg"
            >
              {profile?.bio || 'I craft beautiful, performant web experiences with modern technologies. Passionate about clean code and innovative solutions.'}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col justify-center gap-4 mb-10 sm:flex-row lg:justify-start">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full group bg-gradient-to-r from-primary-color to-secondary-color hover:shadow-lg hover:shadow-primary-color/50"
              >
                View My Work
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={20} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 font-semibold transition-all border rounded-full border-white/20 hover:bg-white/5"
              >
                Get In Touch
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-center gap-4 lg:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full bg-white/5 border-white/10 hover:bg-white/10"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Lightweight Animated Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Floating code icon with simple animation */}
            <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
              {/* Subtle background glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />

              {/* Main floating card */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative p-12 glass-card rounded-3xl sm:p-16"
              >
                {/* Large code icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Code2 size={120} className="text-primary/80" strokeWidth={1.5} />
                </motion.div>

                {/* Floating mini icons around */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="absolute flex items-center justify-center w-12 h-12 rounded-full -top-4 -right-4 bg-primary/20"
                >
                  <Terminal size={24} className="text-primary" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="absolute flex items-center justify-center w-12 h-12 rounded-full -bottom-4 -left-4 bg-secondary/20"
                >
                  <Braces size={24} className="text-secondary" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="absolute flex items-center justify-center w-10 h-10 rounded-full top-1/2 -right-8 bg-purple-500/20"
                >
                  <Rocket size={20} className="text-purple-400" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex justify-center w-6 h-10 border-2 rounded-full border-white/20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
