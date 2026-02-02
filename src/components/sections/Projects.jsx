import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Briefcase } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard.',
      image: '🛒',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop interface, and team collaboration features.',
      image: '✅',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      title: 'AI Content Generator',
      description: 'AI-powered content generation tool using GPT-4 API with custom fine-tuning for marketing content.',
      image: '🤖',
      tech: ['Python', 'FastAPI', 'React', 'OpenAI'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with data visualization and scheduling features.',
      image: '📊',
      tech: ['React', 'D3.js', 'Express', 'Redis'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Real-Time Chat App',
      description: 'Secure messaging application with end-to-end encryption, file sharing, and video call integration.',
      image: '💬',
      tech: ['React Native', 'Firebase', 'WebRTC', 'Node.js'],
      github: '#',
      live: '#',
      featured: false,
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with 7-day forecasts, interactive maps, and location-based alerts.',
      image: '🌤️',
      tech: ['Vue.js', 'Tailwind CSS', 'Weather API'],
      github: '#',
      live: '#',
      featured: false,
    },
  ];

  const experiences = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications, mentoring junior developers, and architecting cloud solutions.',
      achievements: [
        'Led team of 5 developers to rebuild legacy system',
        'Improved application performance by 60%',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions Ltd.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects using React, Node.js, and various databases.',
      achievements: [
        'Delivered 10+ successful projects for diverse clients',
        'Introduced automated testing increasing code coverage to 85%',
        'Developed reusable component library used across projects',
      ],
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2019 - 2020',
      description: 'Started career building web applications and learning best practices in agile development environment.',
      achievements: [
        'Contributed to 5+ production applications',
        'Learned React and Node.js ecosystem',
        'Participated in code reviews and pair programming sessions',
      ],
    },
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
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Projects & <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my work and professional journey
          </motion.p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Experience
          </button>
        </motion.div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className={`glass-card p-6 group ${
                    project.featured ? 'ring-2 ring-primary/50' : ''
                  }`}
                >
                  <div className="text-5xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <motion.div
            key="experience"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 sm:p-8 relative"
                >
                  {/* Timeline line */}
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden sm:block" />
                  )}

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <span className="text-sm text-gray-400 flex items-center gap-2">
                          <Calendar size={14} /> {exp.period}
                        </span>
                      </div>
                      <p className="text-primary font-semibold mb-3">{exp.company}</p>
                      <p className="text-gray-400 mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.1 }}
                            className="text-gray-400 text-sm flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">▹</span>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
