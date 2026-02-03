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
import { experienceService } from '../../services/experienceService';

export default function ExperienceManager() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    period: '',
    description: '',
    achievements: '',
  });

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getExperience();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to load experience:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expData = {
        ...formData,
        achievements: formData.achievements
          .split('\n')
          .map((t) => t.trim())
          .filter((t) => t),
      };

      if (editingExp) {
        await experienceService.updateExperience(editingExp.id, expData);
      } else {
        await experienceService.createExperience(expData);
      }

      setDialogOpen(false);
      resetForm();
      loadExperience();
    } catch (error) {
      console.error('Failed to save experience:', error);
      alert('Failed to save: ' + error.message);
    }
  };

  const handleEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      company: exp.company,
      position: exp.position,
      period: exp.period,
      description: exp.description,
      achievements: exp.achievements ? exp.achievements.join('\n') : '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this experience?')) {
      try {
        await experienceService.deleteExperience(id);
        loadExperience();
      } catch (error) {
        alert('Failed to delete: ' + error.message);
      }
    }
  };

  const resetForm = () => {
    setEditingExp(null);
    setFormData({ company: '', position: '', period: '', description: '', achievements: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your work experience</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass-card p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-primary mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                  <p className="text-gray-300 mb-3">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-1">
                      {exp.achievements.map((a, i) => (
                        <li key={i} className="text-sm text-gray-400">
                          • {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(exp)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="h-4 w-4" />
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
            <DialogTitle>{editingExp ? 'Edit' : 'Add'} Experience</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Position *</Label>
                <Input value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Period</Label>
                <Input placeholder="2020 - 2022" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Achievements (one per line)</Label>
                <Textarea value={formData.achievements} onChange={(e) => setFormData({ ...formData, achievements: e.target.value })} placeholder="Led team of 5&#10;Improved performance by 60%" />
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
