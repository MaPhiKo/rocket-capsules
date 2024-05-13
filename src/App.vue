<script setup lang="ts">
	import { RouterView } from 'vue-router';
	import { useUser } from '@/stores/user';
	import { storeToRefs } from 'pinia';
	import LogoutButton from '@/components/LogoutButton.vue';

	const userStore = useUser();
	const { user } = storeToRefs(userStore);
</script>

<template>
	<header class="bg-black text-green-500 w-full absolute top-0 left-0">
		<nav class="container mx-auto flex justify-between h-20 items-center">
			<ul class="flex gap-4 w-full">
				<li>
					<RouterLink
						class="hover:underline"
						to="/login"
						>Login</RouterLink
					>
				</li>
				<li v-if="user">
					<RouterLink
						class="hover:underline"
						to="/"
						>Rocket Capsules</RouterLink
					>
				</li>
			</ul>
			<LogoutButton
				class="border-sky-300 text-sky-300 hover:border-black hover:bg-green-500 hover:text-black"
			></LogoutButton>
		</nav>
	</header>
	<RouterView />
</template>
