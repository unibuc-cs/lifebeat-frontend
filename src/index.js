import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './app/App';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    // import icons here
    faFireAlt, faDumbbell
  } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
  library.add(faFireAlt, faDumbbell);
  Vue.component('icon', FontAwesomeIcon);
  Vue.config.productionTip = false;

 
Vue.use(VeeValidate);

// setup fake backend
//  import { configureFakeBackend } from './_helpers';
//  configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});