import { clearDashboardSession } from "@/services/auth/server.auth";

export async function POST() {
  return clearDashboardSession();
}
