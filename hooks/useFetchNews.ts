import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import News from "@/types/news";

export default function useFetchNews() {
  const supabase = createClient();
  const [news, setNews] = useState<News[]>([]);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error);
        return;
      }
      setNews(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  const fetchFeaturedNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(2);
      if (error) {
        setError(error);
        return;
      }
      setFeaturedNews(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchNews();
      await fetchFeaturedNews();
      setLoading(false);
    };
    load();
  }, []);
  return {
    news,
    featuredNews,
    loading,
    error,
  };
}
