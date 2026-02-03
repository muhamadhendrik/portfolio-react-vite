import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Save, Search } from 'lucide-react';
import { seoService } from '../../services/seoService';

export default function SEOManager() {
  const [seoSettings, setSeoSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    page_name: 'home',
    title: '',
    description: '',
    keywords: '',
    og_image: '',
    twitter_image: '',
    canonical_url: '',
  });

  useEffect(() => {
    loadSeoSettings();
  }, []);

  useEffect(() => {
    if (seoSettings[activeTab]) {
      setFormData(seoSettings[activeTab]);
    } else {
      setFormData({
        page_name: activeTab,
        title: '',
        description: '',
        keywords: '',
        og_image: '',
        twitter_image: '',
        canonical_url: '',
      });
    }
  }, [activeTab, seoSettings]);

  const loadSeoSettings = async () => {
    try {
      setLoading(true);
      const data = await seoService.getSeoSettings();
      setSeoSettings(data);
    } catch (error) {
      console.error('Failed to load SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving({ ...saving, [activeTab]: true });
      await seoService.upsertSeoSettings(formData);
      await loadSeoSettings();
      alert('SEO settings saved successfully!');
    } catch (error) {
      alert('Failed to save: ' + error.message);
    } finally {
      setSaving({ ...saving, [activeTab]: false });
    }
  };

  const pages = ['home', 'about', 'projects', 'contact'];
  const filteredPages = pages.filter(page =>
    page.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const previewTitle = formData.title || 'Page Title';
  const previewDescription = formData.description || 'Page description will appear here...';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">SEO Settings</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage meta tags and SEO for each page</p>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pages List */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="space-y-2">
              {filteredPages.map((page) => (
                <button
                  key={page}
                  onClick={() => setActiveTab(page)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                    activeTab === page
                      ? 'bg-gradient-to-r from-primary-color to-secondary-color text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize font-medium">{page}</span>
                    {seoSettings[page] && (
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* SEO Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6 capitalize">
                {activeTab} Page SEO
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Page title for SEO"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500">{(formData.title || '').length}/60 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description for search engines"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-gray-500">{(formData.description || '').length}/160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    value={formData.keywords || ''}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-gray-500">Separate keywords with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="og_image">OG Image URL</Label>
                  <Input
                    id="og_image"
                    value={formData.og_image || ''}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                  />
                  <p className="text-xs text-gray-500">Image for Facebook/LinkedIn sharing</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter_image">Twitter Image URL</Label>
                  <Input
                    id="twitter_image"
                    value={formData.twitter_image || ''}
                    onChange={(e) => setFormData({ ...formData, twitter_image: e.target.value })}
                    placeholder="https://example.com/twitter-image.jpg"
                  />
                  <p className="text-xs text-gray-500">Image for Twitter card</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="canonical_url">Canonical URL</Label>
                  <Input
                    id="canonical_url"
                    value={formData.canonical_url || ''}
                    onChange={(e) => setFormData({ ...formData, canonical_url: e.target.value })}
                    placeholder="https://muhamadhendrik.my.id/about"
                  />
                </div>

                {/* Preview */}
                <div className="border border-white/10 rounded-lg p-4 bg-white/5">
                  <h4 className="text-sm font-medium text-gray-400 mb-3">Google Preview</h4>
                  <div className="space-y-1">
                    <p className="text-blue-400 text-sm hover:underline cursor-pointer">
                      {previewTitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      https://muhamadhendrik.my.id/{activeTab}
                    </p>
                    <p className="text-sm text-gray-300">
                      {previewDescription}
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-color to-secondary-color"
                  disabled={saving[activeTab]}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving[activeTab] ? 'Saving...' : 'Save SEO Settings'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
