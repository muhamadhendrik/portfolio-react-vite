import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/ui/Footer';
import NotFound from './components/pages/NotFound';
import {
  ProtectedRoute,
  DashboardLayout,
  DashboardHome,
  ProfileManager,
  ProjectsManager,
  ExperienceManager,
  SkillsManager,
  FeaturesManager,
  SEOManager,
  ContactMessages,
  Login,
} from './pages/Dashboard';

// Public portfolio component
function Portfolio() {
  return (
    <div className="min-h-screen bg-darker">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Portfolio />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<ProfileManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="skills" element={<SkillsManager />} />
          <Route path="features" element={<FeaturesManager />} />
          <Route path="seo" element={<SEOManager />} />
          <Route path="messages" element={<ContactMessages />} />
        </Route>

        {/* 404 Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
