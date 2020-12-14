import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'
import RegisterPage from '../register/RegisterPage'
import ProgramsPage from '../programs/ProgramsPage'
import ProfilePage from '../profile/ProfilePage'
import LeaderboardPage from '../leaderboard/LeaderboardPage'
import Calorie_trackerPage from '../calorie_tracker/Calorie_trackerPage'
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/programs', component: ProgramsPage },
    { path: '/profile', component: ProfilePage },
    { path: '/leaderboard', component: LeaderboardPage },
    { path: '/calorie_tracker', component: Calorie_trackerPage },

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