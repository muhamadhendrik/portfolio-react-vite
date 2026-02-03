import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { featuresService } from '../../services/featuresService';

// Icon options from lucide-react
const iconOptions = [
  'Code', 'Users', 'Zap', 'TrendingUp',
  'Target', 'Lightbulb', 'Rocket', 'Award',
  'Briefcase', 'Star', 'Heart', 'Crown',
  'Flame', 'Gem', 'Shield', 'Sword'
];

export default function FeaturesManager() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Code',
    order_index: 0,
  });

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const data = await featuresService.getFeatures();
      setFeatures(data);
    } catch (error) {
      console.error('Failed to load features:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFeature) {
        await featuresService.updateFeature(editingFeature.id, formData);
      } else {
        await featuresService.createFeature(formData);
      }
      setDialogOpen(false);
      resetForm();
      loadFeatures();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    }
  };

  const handleEdit = (feature) => {
    setEditingFeature(feature);
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon,
      order_index: feature.order_index,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this feature?')) {
      try {
        await featuresService.deleteFeature(id);
        loadFeatures();
      } catch (error) {
        alert('Failed to delete: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setEditingFeature(null);
    setFormData({ title: '', description: '', icon: 'Code', order_index: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your features</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Feature
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.id} className="glass-card p-6 text-center group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(feature)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(feature.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingFeature ? 'Edit' : 'Add'} Feature</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon Name (Lucide icon name) *</Label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  list="icon-suggestions"
                  required
                />
                <datalist id="icon-suggestions">
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon} />
                  ))}
                </datalist>
                <p className="text-xs text-gray-500">
                  Examples: Code, Users, Zap, TrendingUp, Target, Lightbulb, etc.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  min="0"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
