<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import CapsuleCard from '@/components/CapsuleCard.vue';
	import type { Capsule } from '@/types';
	import { useToast } from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-sugar.css';

	const $toast = useToast();
	const capsules = ref<Capsule[] | null>(null);

	const launchCapsule = (serial: string) => {
		$toast.success(`Raumkapsel ${serial} startet`);
	};

	onMounted(async () => {
		const response = await fetch('https://api.spacexdata.com/v4/capsules');
		const data = await response.json();
		capsules.value = data.sort(
			(a: Capsule, b: Capsule) => a.status > b.status
		);
	});
</script>
<template>
	<div class="capsules">
		<CapsuleCard
			v-if="capsules"
			@launch="launchCapsule(capsule.serial)"
			v-for="capsule of capsules"
			:key="capsule.id"
			:capsule
		/>
		<div v-else>loading..</div>
	</div>
</template>
<style scoped>
	.capsules {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 1rem;
	}
</style>
