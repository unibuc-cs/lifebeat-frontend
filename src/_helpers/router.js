import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import ProgramPage  from "../program/ProgramPage";
import ProgramsPage from '../programs/ProgramsPage'
import ProfilePage from '../profile/ProfilePage'
import ProfileUser from '../profile/ProfileUser'
import LeaderboardPage from '../leaderboard/LeaderboardPage'
import Calorie_trackerPage from '../calorie_tracker/Calorie_trackerPage'
import AdminPage from '../admin/AdminPage'
import ExercisesPage from '../execises/ExercisesPage'
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/program/:id', component: ProgramPage, props: true},
    { path: '/user-profile/:id', component: ProfileUser, props: true},
    { path: '/programs', component: ProgramsPage },
    { path: '/profile', component: ProfilePage },
    { path: '/leaderboard', component: LeaderboardPage },
    { path: '/calorie_tracker', component: Calorie_trackerPage },
    { path: '/admin-panel', component: AdminPage},
    { name: 'exercises', path: '/exercise', component: ExercisesPage, props: true},

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})