import { useState, useEffect } from 'react';
import { seoService } from '../services/seoService';

export function useSeo(page) {
  const [seo, setSeo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSeo() {
      try {
        setLoading(true);
        const data = await seoService.getSeoByPage(page || 'home');
        setSeo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSeo();
  }, [page]);

  return { seo, loading, error };
}

export function useAllSeo() {
  const [seoSettings, setSeoSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllSeo() {
      try {
        setLoading(true);
        const data = await seoService.getSeoSettings();
        setSeoSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllSeo();
  }, []);

  return { seoSettings, loading, error };
}
