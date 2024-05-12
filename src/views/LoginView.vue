<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useUser } from '@/stores/user';
	import router from '@/router';

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
	<main>
		<h1>Login</h1>
		<form
			@submit.prevent="handleLogin"
			class="login-form"
			action="#"
			method="post"
		>
			<div class="input-wrapper">
				<label for="userNameInput">Username:</label>
				<input
					type="text"
					name="userName"
					id="userNameInput"
				/>
			</div>
			<div class="input-wrapper">
				<label for="passwordInput">Password:</label>
				<input type="password" />
			</div>
			<button type="submit">Login</button>
		</form>
	</main>
</template>
<style scoped>
	input {
		font: inherit;
	}
	.input-wrapper {
		display: flex;
		flex-direction: column;
	}
	.login-form {
		width: 400px;
		margin: 0 auto;
		border: 2px solid grey;
		padding: 1rem;
	}
</style>
