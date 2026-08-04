import React from "react";
import { LandingPage } from "../../pages/LandingPage";
import { DashboardPage } from "../../pages/Admin/DashboardPage";
import { AuthPage } from "../../pages/AuthPage";
import { ProfilePage } from "../../pages/ProfilePage"; // <--- Новый импорт
import { MainLayout } from "../Layouts/BaseLayout";
import { AdminLayout } from "../Layouts/AdminLayout";
import { EventDetailPage } from "../../pages/EventDetailPage";
import { EventsPage } from "../../pages/Admin/EventPage";
import { MembersPage } from "../../pages/Admin/MembersPage";
import { MentorsPage } from "../../pages/Admin/MentorsPage";
import { CertificatesPage } from "../../pages/Admin/CertificatesPage";
import { ReportsPage } from "../../pages/Admin/ReportsPage";
import { SettingsPage } from "../../pages/Admin/SettingsPage";
import { CheckInPage } from "../../pages/Admin/ChekInPage";
import { PaymentsPage } from "../../pages/Admin/PaymentsPage";

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<{ children?: React.ReactNode }>;
  isPrivate?: boolean;
  roles?: string[];
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    component: LandingPage,
    layout: MainLayout,
    isPrivate: false,
  },
  {
    path: "/auth",
    component: AuthPage,
    // без layout
    isPrivate: false,
  },
  {
    path: "/profile", // <--- Добавили Личный Кабинет Покупателя/Участника
    component: ProfilePage,
    layout: MainLayout,
    isPrivate: true,
  },

  {
    path: "event/:id",
    component: EventDetailPage,
    layout: MainLayout,
    isPrivate: false,
  },
  {
    path: "/admin", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: DashboardPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
  {
    path: "/admin/events", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: EventsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
  {
    path: "/admin/members", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: MembersPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
    {
    path: "/admin/mentors", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: MentorsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
    {
    path: "/admin/certificates", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: CertificatesPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
    {
    path: "/admin/reports", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: ReportsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
    {
    path: "/admin/settings", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: SettingsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
      {
    path: "/admin/checkin", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: CheckInPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
       {
    path: "/admin/payments", // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: PaymentsPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ["ADMIN"],
  },
];
