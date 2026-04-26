import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Events from "@/types/events";

export function useFetchEvent() {
  const supabase = createClient();
  const [events, setEvents] = useState<Events[]>([]);
  const [latestEvents, setLatestEvents] = useState<Events[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        setError(error);
        return;
      }
      setEvents(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  const fetchLatestEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("status", "current")
        .limit(3);
      if (error) {
        setError(error);
        return;
      }
      setLatestEvents(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  const fetchUpcomingEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "upcoming")
        .limit(3);
      if (error) {
        setError(error);
        return;
      }
      setUpcomingEvents(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchEvents();
      await fetchLatestEvents();
      await fetchUpcomingEvents();
      setLoading(false);
    };
    load();
  }, []);
  return { events, latestEvents, upcomingEvents, loading, error };
}
