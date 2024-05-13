<script setup lang="ts">
	import { ref, onMounted, reactive, computed } from 'vue';
	import CapsuleCard from '@/components/CapsuleCard.vue';
	import type { Capsule, CapsuleStatus } from '@/types';
	import { useToast } from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-sugar.css';
	import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/16/solid';
	const $toast = useToast();
	const capsules = ref<Capsule[] | null>(null);
	const capsulesVisibility = reactive({
		active: {
			visible: true,
			color: 'green-500',
		},
		destroyed: {
			visible: true,
			color: 'red-700',
		},
		retired: {
			visible: true,
			color: 'amber-700',
		},
		unknown: {
			visible: true,
			color: 'purple-700',
		},
	});

	const visibleCapsules = computed(() => {
		return capsules.value?.filter((capsule) => {
			return capsulesVisibility[capsule.status].visible;
		});
	});

	const toggleVisibility = (status: CapsuleStatus) => {
		capsulesVisibility[status].visible =
			!capsulesVisibility[status].visible;
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
	<div class="flex flex-col space-y-10">
		<div class="flex flex-row space-x-4 justify-center">
			<button
				:class="`shadow-sm flex items-center rounded-lg py-1 px-5 gap-2 bg-black border-2 hover:border-black hover:text-black border-${value.color} text-${value.color} hover:bg-${value.color}`"
				type="button"
				v-for="(value, status) of capsulesVisibility"
				:key="status"
				@click="toggleVisibility(status)"
			>
				<EyeIcon
					v-if="!value.visible"
					class="w-[2rem] h-[2rem]"
				/>
				<EyeSlashIcon
					v-if="value.visible"
					class="w-[2rem] h-[2rem]"
				/>
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
				:statusColor="capsulesVisibility[capsule.status].color"
			/>
			<div v-else>loading..</div>
		</div>
	</div>
</template>
<style scoped>
	.capsules {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(30rem, 100%), 1fr));
		gap: 1rem;
	}
</style>
