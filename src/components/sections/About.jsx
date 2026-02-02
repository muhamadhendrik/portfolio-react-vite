import { motion } from 'framer-motion';
import { Code, Users, Zap, TrendingUp } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and well-documented code following best practices.',
    },
    {
      icon: Users,
      title: 'Team Player',
      description: 'Collaborating effectively with cross-functional teams to deliver exceptional results.',
    },
    {
      icon: Zap,
      title: 'Problem Solver',
      description: 'Approaching challenges with creative solutions and out-of-the-box thinking.',
    },
    {
      icon: TrendingUp,
      title: 'Result Oriented',
      description: 'Focused on delivering high-quality solutions that meet business objectives.',
    },
  ];

  const skills = [
    { name: 'Frontend Development', level: 95 },
    { name: 'Backend Development', level: 85 },
    { name: 'UI/UX Design', level: 80 },
    { name: 'DevOps', level: 75 },
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
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              Who I Am
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
              I'm a Full Stack Developer with 5+ years of experience building web applications.
              I specialize in React, Node.js, and modern web technologies. My passion lies in
              creating user-friendly interfaces and robust backend systems.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 mb-4 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to
              open-source projects, or sharing knowledge through blog posts and mentoring.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-300 leading-relaxed">
              I believe in continuous learning and staying updated with the latest industry trends
              to deliver cutting-edge solutions.
            </motion.p>
          </motion.div>

          {/* Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-6">
              My Skills
            </motion.h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-6 text-center group"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <feature.icon size={32} className="text-primary" />
              </motion.div>
              <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
