import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { useUser } from '@/stores/user';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	linkActiveClass: 'text-sky-300',
	routes: [
		{
			path: '/',
			name: 'Capsules',
			component: () => import('../views/CapsulesView.vue'),
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginView,
		},
	],
});
router.beforeEach(async (to) => {
	const { user } = useUser();
	if (!user && to.name !== 'Login') return '/login';
});
export default router;
