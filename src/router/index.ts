import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { useUser } from '@/stores/user';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'rockets',
			component: () => import('../views/CapsulesView.vue'),
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
	],
});
router.beforeEach(async (to) => {
	const { user } = useUser();
	if (!user && to.name !== 'login') return '/login';
});
export default router;
