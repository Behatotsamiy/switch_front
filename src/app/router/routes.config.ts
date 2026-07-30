import React from 'react';
import { LandingPage } from '../../pages/LandingPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { AuthPage } from '../../pages/AuthPage';
import { ProfilePage } from '../../pages/ProfilePage'; // <--- Новый импорт
import { MainLayout } from '../Layouts/BaseLayout';
import { AdminLayout } from '../Layouts/AdminLayout';
import { EventDetailPage } from '../../pages/EventDetailPage';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<{ children?: React.ReactNode }>;
  isPrivate?: boolean;
  roles?: string[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: LandingPage,
    layout: MainLayout,
    isPrivate: false,
  },
  {
    path: '/auth',
    component: AuthPage,
    // без layout
    isPrivate: false,
  },
  {
    path: '/profile', // <--- Добавили Личный Кабинет Покупателя/Участника
    component: ProfilePage,
    layout: MainLayout,
    isPrivate: true,
  },
  {
    path: '/admin', // <--- DashboardPage ТОЛЬКО ДЛЯ АДМИНА
    component: DashboardPage,
    layout: AdminLayout,
    isPrivate: true,
    roles: ['ADMIN'],
  },
  {
    path:'event/:id',
    component: EventDetailPage,
    layout: MainLayout,
    isPrivate: false,
  }
];