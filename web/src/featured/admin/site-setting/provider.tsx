import { SettingAdminDb } from "@/@types/setting-admin";
import React, { createContext, useContext } from "react";

interface AdminSettingContextTypes {
  settings: SettingAdminDb[];
}

const AdminSettingContext = createContext<AdminSettingContextTypes>(
  {} as AdminSettingContextTypes
);

interface AdminSettingProviderProps {
  settings: SettingAdminDb[];
  children: React.ReactNode;
}

export function AdminSettingProvider({
  children,
  settings,
}: AdminSettingProviderProps) {
  const value: AdminSettingContextTypes = {
    settings,
  };

  return (
    <AdminSettingContext.Provider value={value}>
      {children}
    </AdminSettingContext.Provider>
  );
}

export const useAdminSetting = () => useContext(AdminSettingContext);
