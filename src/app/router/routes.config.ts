import React from 'react';
import { LandingPage } from '../../pages/LandingPage';
import { EventDetailPage } from '../../pages/EventDetailPage';
import { AdminEventsPage } from '../../pages/Admin/AdminEventsPage';
import { MainLayout } from '../Layouts/BaseLayout';
import { AdminLayout } from '../Layouts/AdminLayout';
import { ProfilePage } from '../../pages/ProfilePage';
import { AuthPage } from '../../pages/AuthPage';

export interface RouteConfig {
  path: string;
  isPrivate?: boolean;
  roles?: string[];
  component: React.ComponentType;
  layout?: React.ComponentType<{ children?: React.ReactNode }>;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    component: LandingPage,
    layout: MainLayout,
  },
  {
    path: '/event/:id',
    component: EventDetailPage,
    layout: MainLayout,
  },
  {
    path: '/admin',
    isPrivate: true,
    roles: ['admin'],
    component: AdminEventsPage,
    layout: AdminLayout,
  },
    {
    path: '/profile',
    component: ProfilePage,
    layout: MainLayout,
  },
      {
    path: '/auth',
    component: AuthPage,
    layout: MainLayout,
  },
];