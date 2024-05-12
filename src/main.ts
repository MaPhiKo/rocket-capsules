import { createApp, watchEffect } from 'vue';
import { createPinia, storeToRefs } from 'pinia';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import { useUser } from './stores/user';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ToastPlugin);

app.mount('#app');

const userStorage = useUser();
const { user } = storeToRefs(userStorage);
watchEffect(() => {
	if (user.value) {
		sessionStorage.setItem('user', JSON.stringify(user.value));
	}
});
