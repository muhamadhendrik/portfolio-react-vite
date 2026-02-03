import { useState, useEffect } from 'react';
import { featuresService } from '../services/featuresService';

export function useFeatures() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatures() {
      try {
        setLoading(true);
        const data = await featuresService.getFeatures();
        setFeatures(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatures();
  }, []);

  return { features, loading, error };
}
