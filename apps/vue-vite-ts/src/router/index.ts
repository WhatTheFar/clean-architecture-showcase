import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LoginPage from '/@/pages/LoginPage.vue';
import HomePage from '/@/pages/HomePage.vue';

export const RoutePaths = {
  homepage: '/',
  login: '/login',
};

const history = createWebHistory();
const routes: RouteRecordRaw[] = [
  {
    path: RoutePaths.login,
    component: LoginPage,
  },
  {
    path: RoutePaths.homepage,
    component: HomePage,
  },
];

export const router = createRouter({ history, routes });
