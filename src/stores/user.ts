import { ref } from 'vue';
import { defineStore } from 'pinia';

const checkStorage = () => {
	if (sessionStorage.getItem('user'))
		return JSON.parse(sessionStorage.getItem('user')!);
	return null;
};

export const useUser = defineStore('user', () => {
	const user = ref<{} | null>(checkStorage());

	const login = async () => {
		const response = await fetch('https://randomuser.me/api/');
		const data = await response.json();
		user.value = data.results[0];
	};
	const logout = () => {
		user.value = null;
	};
	return { user, login, logout };
});
