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
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden dark bg-darker">
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
          <div className="flex justify-center mt-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full opacity-50 bg-gradient-to-r from-primary-color to-secondary-color blur-xl"></div>
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                <Code2 size={40} className="text-primary" />
              </div>
            </div>
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-white gradient-text">Admin Dashboard</CardTitle>
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
                <div className="p-3 text-sm text-center text-red-400 border rounded-lg bg-red-400/10 border-red-400/20">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full font-semibold text-white shadow-lg bg-gradient-to-r from-primary-color to-secondary-color hover:opacity-90 shadow-primary/50"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
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
            {/* <div className="pt-6 mt-6 border-t border-white/10">
              <div className="p-4 text-center rounded-lg bg-white/5">
                <p className="mb-2 text-sm text-gray-400">Default Credentials:</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="px-3 py-1 border rounded bg-white/5 border-white/10">
                    <span className="text-gray-400">Username:</span>
                    <span className="ml-2 font-mono text-white">admin</span>
                  </div>
                  <div className="px-3 py-1 border rounded bg-white/5 border-white/10">
                    <span className="text-gray-400">Password:</span>
                    <span className="ml-2 font-mono text-white">admin123</span>
                  </div>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
