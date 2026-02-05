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
      <section id="tech" className="relative py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-center">Loading skills...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="tech" className="relative py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.h3 variants={itemVariants} className="mb-4 text-4xl font-bold md:text-5xl">
            Tech <span className="gradient-text">Stack</span>
          </motion.h3>
          <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-400">
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
                className="flex items-center gap-3 mb-6 text-2xl font-bold"
              >
                {categoryEmojis[category] && <span>{categoryEmojis[category]}</span>}
                {category}
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
                    className="flex flex-col items-center justify-center gap-3 p-4 cursor-pointer glass-card sm:p-6 group"
                  >
                    {tech.icon_url && (
                      <motion.div
                        className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20"
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
                          className="object-contain w-full h-full"
                          loading="lazy"
                        />
                      </motion.div>
                    )}
                    <span className="text-sm font-medium text-center text-gray-300 transition-colors group-hover:text-white">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Currently Learning Section */}
        {/* {skills['Currently Learning'] && skills['Currently Learning'].length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-8 mt-16 text-center glass-card"
          >
            <motion.h3 variants={itemVariants} className="mb-4 text-2xl font-bold">
              Currently Learning 🚀
            </motion.h3>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-400">
              I'm constantly expanding my knowledge. Currently diving deep into{' '}
              {skills['Currently Learning'].map((skill, index) => (
                <span key={skill.id} className="font-semibold text-primary-color">
                  {skill.name}
                  {index < skills['Currently Learning'].length - 2 && ', '}
                  {index === skills['Currently Learning'].length - 2 && ' and '}
                </span>
              ))}
              .
              Always excited to learn new technologies and improve my craft.
            </motion.p>
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default TechStack;
