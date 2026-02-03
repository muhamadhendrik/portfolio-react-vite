import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { authService } from '../../services/authService';
import { Lock, Code2 } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-darker relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-3xl animate-float" />
        <div className="absolute rounded-full bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f08_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f08_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="glass-card bg-white/5 border-white/20 backdrop-blur-xl">
          {/* Logo Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-color to-secondary-color blur-xl opacity-50 rounded-full"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Code2 size={40} className="text-primary" />
              </div>
            </div>
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold gradient-text text-white">Admin Dashboard</CardTitle>
            <CardDescription className="text-gray-400 dark:text-gray-400">
              Sign in to manage your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3 text-center">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-color to-secondary-color hover:opacity-90 text-white font-semibold shadow-lg shadow-primary/50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock size={18} />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-400 mb-2">Default Credentials:</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="bg-white/5 px-3 py-1 rounded border border-white/10">
                    <span className="text-gray-400">Username:</span>
                    <span className="ml-2 text-white font-mono">admin</span>
                  </div>
                  <div className="bg-white/5 px-3 py-1 rounded border border-white/10">
                    <span className="text-gray-400">Password:</span>
                    <span className="ml-2 text-white font-mono">admin123</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
