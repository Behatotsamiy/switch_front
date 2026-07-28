import type { AppRoute } from "./routes.types";
import {BaseLayout} from "../Layouts/BaseLayout";
import {DashboardPage} from "../../pages/DashboardPage";
import {LandingPage} from "../../pages/LandingPage";



export const routes: AppRoute[] = [
  {
    path: "/",
    layout: BaseLayout,
    component: LandingPage,
  },
  // {
  //   path: "/auth",
  //   layout: AuthLayout,
  //   component: LoginPage,
  // },
  {
    path: "/dashboard",
    layout: BaseLayout,
    component: DashboardPage,
    isPrivate: true,
    roles: ["admin"], // Доступ только для владельца и админа
  },


  // {
  //   path: "/settings",
  //   layout: BaseLayout,
  //   component: SettingsPage,
  //   isPrivate: true,
  // },

 
];
