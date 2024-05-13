<script setup lang="ts">
	import { computed, ref } from 'vue';
	import type { Capsule } from '@/types';
	import { RocketLaunchIcon } from '@heroicons/vue/24/solid';
	const props = defineProps<{
		capsule: Capsule;
		statusColor: string;
	}>();
	const emit = defineEmits(['launch']);
	const rocket = ref(null);
	const launched = ref(false);
	const launchable = computed(() => {
		return props.capsule.type === 'Dragon 2.0';
	});
	const launch = () => {
		launched.value = true;
		emit('launch');
	};
</script>
<template>
	<article class="flex flex-col border-2 border-black shadow-sm bg-slate-200">
		<header
			class="p-4 flex flex-col sm:flex-row justify-between bg-slate-300 border-b border-black"
		>
			<div class="order-2 sm:order-1">
				<h2 class="text-4xl font-semibold">{{ capsule.serial }}</h2>
				<div>id: {{ capsule.id }}</div>
				<div>
					Type: <span class="font-semibold">{{ capsule.type }}</span>
				</div>
			</div>
			<div class="order-1 sm:order-2">
				<div class="flex items-center gap-2">
					<div class="font-semibold">Status</div>
					<div
						:class="`bg-${props.statusColor} w-4 h-4 rounded-full animate-pulse border border-black`"
					></div>
				</div>
			</div>
		</header>
		<body class="p-4 flex flex-col gap-4 grow">
			<div
				class="flex h-36 items-center justify-center py-10 bg-sky-200 border border-black shadow-sm"
			>
				<transition name="rocket">
					<RocketLaunchIcon
						v-if="!launched"
						ref="rocket"
						class="w-16 h-16 -rotate-45"
					/>
				</transition>
			</div>
			<div
				class="p-4 grow flex flex-col gap-2 bg-stone-200 border border-black shadow-sm"
			>
				<div class="grid grid-cols-2">
					<div>
						<span class="font-semibold"> Reuse count:</span>
						{{ capsule.reuse_count }}
					</div>
					<div>
						<span class="font-semibold"> Water landings:</span>
						{{ capsule.water_landings }}
					</div>
				</div>
				<div>
					<p class="font-semibold">Last update:</p>
					<p v-if="capsule.last_update">
						{{ capsule.last_update }}
					</p>
					<p v-else>No recorded updates</p>
				</div>
				<div>
					<p class="font-semibold">Launches:</p>
					<ul v-if="capsule.launches.length">
						<li
							class="flex gap-2 items-center"
							v-for="launch of capsule.launches"
							:key="launch"
						>
							<RocketLaunchIcon class="w-8 h-8" />
							{{ launch }}
						</li>
					</ul>
					<p v-else>No recorded launches.</p>
				</div>
			</div>
		</body>
		<footer class="p-4">
			<button
				class="py-2 px-5 border-2 border-black h-min w-min shadow-sm"
				:class="[
					launchable && !launched
						? 'bg-sky-300 hover:bg-green-500 '
						: 'bg-gray-500 hover:cursor-not-allowed',
				]"
				@click="launch"
				type="button"
				:disabled="!launchable || launched"
			>
				Launch
			</button>
		</footer>
	</article>
</template>
<style scoped>
	.rocket-leave-active {
		transition: all 0.8s ease-in;
	}
	.rocket-leave-to {
		transform: translateY(-600px) translateX(200px);
	}
</style>
