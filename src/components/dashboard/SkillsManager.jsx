import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { skillsService } from '../../services/skillsService';

export default function SkillsManager() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [activeTab, setActiveTab] = useState('Frontend');
  const [formData, setFormData] = useState({
    category: 'Frontend',
    name: '',
    level: 50,
    icon_url: '',
    color: '',
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await skillsService.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await skillsService.updateSkill(editingSkill.id, formData);
      } else {
        await skillsService.createSkill(formData);
      }
      setDialogOpen(false);
      resetForm();
      loadSkills();
    } catch (error) {
      alert('Failed to save: ' + error.message);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      category: skill.category,
      name: skill.name,
      level: skill.level,
      icon_url: skill.icon_url || '',
      color: skill.color || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this skill?')) {
      try {
        await skillsService.deleteSkill(id);
        loadSkills();
      } catch (error) {
        alert('Failed to delete: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setEditingSkill(null);
    setFormData({ category: 'Frontend', name: '', level: 50, icon_url: '', color: '' });
  };

  const categories = Object.keys(skills);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your technical skills</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((cat) => (
            <TabsContent key={cat} value={cat}>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills[cat]?.map((skill) => (
                  <div key={skill.id} className="glass-card p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {skill.icon_url && (
                          <img src={skill.icon_url} alt={skill.name} className="w-6 h-6" />
                        )}
                        <span className="font-semibold">{skill.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(skill)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(skill.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary-color to-secondary-color"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{skill.level}%</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSkill ? 'Edit' : 'Add'} Skill</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Level (1-100)</Label>
                <Input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Icon URL</Label>
                <Input
                  value={formData.icon_url}
                  onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                  placeholder="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                />
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="#61DAFB"
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
