import { useState, useEffect } from 'react';
import { experienceService } from '../services/experienceService';

export function useExperience() {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperience() {
      try {
        setLoading(true);
        const data = await experienceService.getExperience();
        setExperience(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchExperience();
  }, []);

  return { experience, loading, error };
}
