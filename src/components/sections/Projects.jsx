import { motion } from 'framer-motion';
import { Github, ExternalLink, Calendar, Briefcase } from 'lucide-react';
import { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { useExperience } from '../../hooks/useExperience';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const { projects, loading: loadingProjects } = useProjects();
  const { experience, loading: loadingExperience } = useExperience();

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
                ? 'bg-gradient-to-r from-primary-color to-secondary-color text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'experience'
                ? 'bg-gradient-to-r from-primary-color to-secondary-color text-white'
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
            {loadingProjects ? (
              <p className="text-center">Loading projects...</p>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className={`glass-card p-6 group ${
                      project.featured ? 'ring-2 ring-primary/50' : ''
                    }`}
                  >
                    <div className="text-5xl mb-4">{project.emoji}</div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
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
                        href={project.github_url}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <Github size={16} /> Code
                      </a>
                      <a
                        href={project.demo_url}
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
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
            {loadingExperience ? (
              <p className="text-center">Loading experience...</p>
            ) : (
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 sm:p-8 relative"
                  >
                    {/* Timeline line */}
                    {index !== experience.length - 1 && (
                      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent hidden sm:block" />
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-color to-secondary-color flex items-center justify-center flex-shrink-0">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                          <span className="text-sm text-gray-400 flex items-center gap-2">
                            <Calendar size={14} /> {exp.period}
                          </span>
                        </div>
                        <p className="text-primary font-semibold mb-3">{exp.company}</p>
                        <p className="text-gray-400 mb-4">{exp.description}</p>
                        {exp.achievements && exp.achievements.length > 0 && (
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
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
