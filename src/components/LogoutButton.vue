<script setup lang="ts">
	import { useUser } from '@/stores/user';
	import router from '@/router';

	const userStore = useUser();

	const handleLogout = () => {
		userStore.logout();
		router.push('/login');
	};
</script>
<template>
	<button
		class="py-2 px-5 border-2 h-min"
		@click="handleLogout"
		type="button"
	>
		<slot>Logout</slot>
	</button>
</template>
