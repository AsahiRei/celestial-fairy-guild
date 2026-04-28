import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Users from "@/types/users";

export function useFetchUser() {
  const supabase = createClient();
  const [users, setUsers] = useState<Users[]>([]);
  const [highestLevel, setHighestLevel] = useState<number>(0);
  const [totalGuildPoints, setTotalGuildPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("level", { ascending: false });
      if (error) {
        setError(error);
        return;
      }
      setUsers(data || []);
    } catch (err) {
      setError(err as Error);
    }
  };
  const fetchHighestLevel = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("level")
        .order("level", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) {
        setError(error);
        return;
      }
      setHighestLevel(data?.level || 0);
    } catch (err) {
      setError(err as Error);
    }
  };
  const fetchTotalGuildPoints = async () => {
    try {
      const { data, error } = await supabase.rpc("get_total_guild_points");
      if (error) {
        setError(error);
        return;
      }
      setTotalGuildPoints(data || 0);
    } catch (err) {
      setError(err as Error);
    }
  };
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchUsers();
      await fetchHighestLevel();
      await fetchTotalGuildPoints();
      setLoading(false);
    };
    load();
  }, []);
  return {
    users,
    loading,
    error,
    highestLevel,
    totalGuildPoints,
  };
}