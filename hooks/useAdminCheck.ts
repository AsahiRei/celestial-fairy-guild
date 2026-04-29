import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function useAdminCheck() {
  const supabase = createClient();
  const userExists = async (code: number) => {
    try {
      const { data, error } = await supabase
        .from("admin_code")
        .select("*")
        .eq("code", code)
        .maybeSingle();
      if (error) throw error;
      return !!data;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  return { userExists };
}
