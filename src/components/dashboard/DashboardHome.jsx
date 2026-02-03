import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FolderKanban, Briefcase, GraduationCap, Mail, Sparkles } from 'lucide-react';

export default function DashboardHome() {
  // This would fetch actual stats from the API
  const stats = [
    {
      title: 'Total Projects',
      value: '6',
      icon: FolderKanban,
    },
    {
      title: 'Work Experience',
      value: '3',
      icon: Briefcase,
    },
    {
      title: 'Skills',
      value: '26',
      icon: GraduationCap,
    },
    {
      title: 'Messages',
      value: '0',
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Dashboard</span>
        </h1>
        <p className="mt-2 text-gray-400">Welcome back! Here's an overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all glass-card hover:border-white/20 group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <div className="flex items-center justify-center w-12 h-12 transition-transform rounded-xl bg-primary/10 group-hover:scale-110">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href="/dashboard/projects"
              className="p-4 transition-all duration-300 border group border-white/10 rounded-xl hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-primary-color to-secondary-color">
                  <FolderKanban className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white transition-colors group-hover:text-primary">Add New Project</h3>
                  <p className="mt-1 text-sm text-gray-400">Showcase your latest work</p>
                </div>
              </div>
            </a>
            <a
              href="/dashboard/profile"
              className="p-4 transition-all duration-300 border group border-white/10 rounded-xl hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-secondary/5"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-secondary-color to-primary-color">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white transition-colors group-hover:text-secondary">Update Profile</h3>
                  <p className="mt-1 text-sm text-gray-400">Keep your info up to date</p>
                </div>
              </div>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
