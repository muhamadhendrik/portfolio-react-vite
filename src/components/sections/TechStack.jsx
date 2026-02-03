import { motion } from 'framer-motion';
import { useSkills } from '../../hooks/useSkills';

const TechStack = () => {
  const { skills, loading } = useSkills();

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const categoryEmojis = {
    'Frontend': '🎨',
    'Backend': '⚙️',
    'Tools & DevOps': '🛠️',
    'Currently Learning': '🚀',
    'General': '',
  };

  if (loading) {
    return (
      <section id="tech" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tech" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </motion.h3>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(skills).map(([category, technologies]) => (
            <motion.div
              key={category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-6 flex items-center gap-3"
              >
                {categoryEmojis[category] && <span>{categoryEmojis[category]}</span>}
                {category}
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card p-4 sm:p-6 flex flex-col items-center justify-center gap-3 group cursor-pointer"
                  >
                    {tech.icon_url && (
                      <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut',
                        }}
                      >
                        <img
                          src={tech.icon_url}
                          alt={tech.name}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning Section */}
        {skills['Currently Learning'] && skills['Currently Learning'].length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 glass-card p-8 text-center"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-4">
              Currently Learning 🚀
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
              I'm constantly expanding my knowledge. Currently diving deep into{' '}
              {skills['Currently Learning'].map((skill, index) => (
                <span key={skill.id} className="text-primary">
                  {skill.name}
                  {index < skills['Currently Learning'].length - 2 && ', '}
                  {index === skills['Currently Learning'].length - 2 && ' and '}
                </span>
              ))}
              .
              Always excited to learn new technologies and improve my craft.
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TechStack;
