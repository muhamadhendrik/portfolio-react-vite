import { useState, useEffect } from 'react';
import { skillsService } from '../services/skillsService';

export function useSkills() {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSkills() {
      try {
        setLoading(true);
        const data = await skillsService.getSkills();
        setSkills(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return { skills, loading, error };
}
