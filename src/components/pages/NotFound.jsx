import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-darker relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl animate-float" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[180px] md:text-[220px] font-bold bg-gradient-to-r from-primary-color to-secondary-color bg-clip-text text-transparent leading-none"
          >
            404
          </motion.h1>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved to a different URL.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/"
              className="flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all rounded-full bg-gradient-to-r from-primary-color to-secondary-color hover:shadow-lg hover:shadow-primary/50"
            >
              <Home size={20} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-8 py-4 font-semibold transition-all border rounded-full border-white/20 hover:bg-white/5"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -left-20 text-6xl opacity-20"
          >
            💻
          </motion.div>
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -right-20 text-6xl opacity-20"
          >
            🚀
          </motion.div>
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-32 text-5xl opacity-20"
          >
            ⚡
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
