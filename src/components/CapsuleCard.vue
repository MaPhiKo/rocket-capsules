<script setup lang="ts">
	import { computed } from 'vue';
	import type { Capsule } from '@/types';
	import { RocketLaunchIcon } from '@heroicons/vue/24/solid';
	const props = defineProps<{
		capsule: Capsule;
		statusColor: string;
	}>();
	const launchable = computed(() => {
		return props.capsule.type === 'Dragon 2.0';
	});
</script>
<template>
	<article
		class="flex flex-col p-4 border-2 border-black shadow-sm bg-slate-200"
	>
		<div>
			<h2>id: {{ capsule.id }}</h2>
			<div class="flex items-center gap-2">
				<div>Status:</div>
				<div
					:class="`bg-${props.statusColor} w-4 h-4 rounded-full animate-pulse border border-black`"
				></div>
			</div>
			<div>Reuse count: {{ capsule.reuse_count }}</div>
			<div>Water landings: {{ capsule.water_landings }}</div>
			<div>Last update: {{ capsule.last_update }}</div>
			<div>
				<h3>Launches</h3>
				<ul v-if="capsule.launches.length">
					<li
						v-for="launch of capsule.launches"
						:key="launch"
					>
						{{ launch }}
					</li>
				</ul>
				<p v-else>No recorded launches.</p>
			</div>
			<div>Serial: {{ capsule.serial }}</div>
			<div>Type: {{ capsule.type }}</div>
		</div>
		<RocketLaunchIcon class="w-16 h-16" />
		<button
			class="py-2 px-5 border-2 border-black h-min w-min"
			:class="[
				launchable
					? 'bg-sky-300 hover:bg-green-500 '
					: 'bg-gray-500 hover:cursor-not-allowed',
			]"
			@click="$emit('launch')"
			type="button"
			:disabled="!launchable"
		>
			Launch
		</button>
	</article>
</template>
