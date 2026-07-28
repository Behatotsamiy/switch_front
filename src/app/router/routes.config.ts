import React from 'react';
import { LandingPage } from '../../pages/LandingPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { AuthPage } from '../../pages/AuthPage';
import { MainLayout } from '../Layouts/BaseLayout';
import { AdminLayout } from '../Layouts/AdminLayout';

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
    path: '/admin',
    component: DashboardPage,
    layout: AdminLayout,
    // isPrivate: true,
    // roles: ['ADMIN'],
  },
];