<script setup lang="ts">
	import { ref, onMounted, reactive, computed } from 'vue';
	import CapsuleCard from '@/components/CapsuleCard.vue';
	import type { Capsule, CapsuleStatus } from '@/types';
	import { useToast } from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-sugar.css';

	const $toast = useToast();
	const capsules = ref<Capsule[] | null>(null);
	const capsulesVisibility = reactive({
		unknown: true,
		active: true,
		retired: true,
		destroyed: true,
	});

	const visibleCapsules = computed(() => {
		return capsules.value?.filter((capsule) => {
			return capsulesVisibility[capsule.status];
		});
	});

	const toggleVisibility = (status: CapsuleStatus) => {
		capsulesVisibility[status] = !capsulesVisibility[status];
	};
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
	<div>
		<div class="statusToggles">
			<button
				type="button"
				v-for="(value, status) of capsulesVisibility"
				:key="status"
				@click="toggleVisibility(status)"
			>
				{{ status }}
			</button>
		</div>
		<div class="capsules">
			<CapsuleCard
				v-if="visibleCapsules"
				@launch="launchCapsule(capsule.serial)"
				v-for="capsule of visibleCapsules"
				:key="capsule.id"
				:capsule
			/>
			<div v-else>loading..</div>
		</div>
	</div>
</template>
<style scoped>
	.capsules {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
		gap: 1rem;
	}
</style>
