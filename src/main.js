import Vue from 'vue';
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
import App from './App.vue';

Vue.config.productionTip = false;

// $mount le permite montar explícitamente la instancia de Vue cuando lo necesite
new Vue({
  render: h => h(App),
}).$mount('#app');
