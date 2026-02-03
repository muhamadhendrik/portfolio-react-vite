import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderKanban,
  GraduationCap,
  Mail,
  LogOut,
  Menu,
  X,
  Sparkles,
  Search
} from 'lucide-react';
import { useState } from 'react';
import { authService } from '../../services/authService';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { name: 'Experience', href: '/dashboard/experience', icon: Briefcase },
  { name: 'Skills', href: '/dashboard/skills', icon: GraduationCap },
  { name: 'Features', href: '/dashboard/features', icon: Sparkles },
  { name: 'SEO', href: '/dashboard/seo', icon: Search },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-darker dark">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 transform border-r border-white/10 bg-darker transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <Link to="/dashboard" className="text-xl font-bold gradient-text">
              Portfolio Admin
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-color to-secondary-color text-white shadow-lg shadow-primary/50'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-400 hover:text-white"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-darker/80 backdrop-blur-sm px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="outline" size="sm">
                View Site
              </Button>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6"><Outlet /></main>
      </div>
    </div>
  );
}
