import type { Metadata } from "next";
import AdminDashboard from "./client-dashboard";

export const metadata: Metadata = {
  title: "Celestial Admin Panel",
};

export default function Page() {
  return <AdminDashboard />;
}
