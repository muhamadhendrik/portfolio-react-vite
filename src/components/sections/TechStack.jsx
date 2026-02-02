import { motion } from 'framer-motion';

const TechStack = () => {
  const categories = [
    {
      title: 'Frontend',
      icon: '🎨',
      technologies: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000' },
        { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
        { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss', color: '#06B6D4' },
        { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg', color: '#646CFF' },
        { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', color: '#764ABC' },
      ],
    },
    {
      title: 'Backend',
      icon: '⚙️',
      technologies: [
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396' },
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: '🛠️',
      technologies: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
        { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#FF9900' },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', color: '#FFCA28' },
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' },
        { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#FF6C37' },
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

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
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={itemVariants}
                className="text-2xl font-bold mb-6 flex items-center gap-3"
              >
                <span>{category.icon}</span>
                {category.title}
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
              >
                {category.technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="glass-card p-4 sm:p-6 flex flex-col items-center justify-center gap-3 group cursor-pointer"
                  >
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
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Learning Section */}
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
            <span className="text-primary">Web3</span>,{' '}
            <span className="text-secondary">AI/ML</span>, and{' '}
            <span className="text-primary">Advanced System Design</span>.
            Always excited to learn new technologies and improve my craft.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
