import Vue from 'vue';
import Vuex from 'vuex';

import Image from './Image';
import Tools from './Tools';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Image, Tools },
  strict: process.env.NODE_ENV !== 'production',
});
