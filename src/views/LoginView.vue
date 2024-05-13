<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useUser } from '@/stores/user';
	import router from '@/router';
	import LogoutButton from '@/components/LogoutButton.vue';

	const userStore = useUser();
	const { user } = storeToRefs(userStore);
	const handleLogin = async () => {
		await userStore.login();
		if (user.value) {
			router.push('/');
		}
	};
</script>
<template>
	<main
		class="container mx-auto relative min-h-screen mt-20 py-10 space-y-10"
	>
		<h1 class="text-black text-6xl text-center">Login</h1>
		<form
			v-if="!user"
			@submit.prevent="handleLogin"
			class="flex flex-col justify-between gap-2 max-w-[400px] m-auto border-2 border-black shadow-sm bg-slate-400 text-black p-4 rounded-md"
			action="#"
			method="post"
		>
			<div class="flex flex-col">
				<label for="userNameInput"
					>Username<abbr title="required">*</abbr></label
				>
				<input
					required
					type="text"
					name="userName"
					id="userNameInput"
					class="border-2 border-black text-black"
				/>
			</div>
			<div class="flex flex-col">
				<label for="passwordInput"
					>Password<abbr title="required">*</abbr></label
				>
				<input
					required
					type="password"
					class="border-2 border-black text-black"
				/>
			</div>
			<button
				class="py-2 px-5 border-2 border-black bg-sky-300 hover:bg-green-500 hover:text-black"
				type="submit"
			>
				Login
			</button>
		</form>
		<div
			v-else
			class="flex flex-col items-center justify-center space-y-4 border-2 border-black shadow-sm max-w-[400px] mx-auto p-4 bg-slate-400 rounded-md"
		>
			<p>You're already logged in.</p>
			<LogoutButton
				class="border-black bg-sky-300 hover:bg-green-500 hover:text-black"
			></LogoutButton>
		</div>
	</main>
</template>
