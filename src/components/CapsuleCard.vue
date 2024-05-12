<script setup lang="ts">
	import type { Capsule } from '@/types';
	import { computed } from 'vue';
	const props = defineProps<{
		capsule: Capsule;
	}>();
	const statusColor = computed(() => props.capsule.status);
</script>
<template>
	<article class="card">
		<div>
			<h2>id: {{ capsule.id }}</h2>
			<div>
				Status: <span :class="statusColor"> {{ capsule.status }} </span>
			</div>
			<div>Reuse count: {{ capsule.reuse_count }}</div>
			<div>Water landings: {{ capsule.water_landings }}</div>
			<div>Last update: {{ capsule.last_update }}</div>
			<div v-if="capsule.launches">
				<h3>Launches</h3>
				<ul>
					<li
						v-for="launch of capsule.launches"
						:key="launch"
					>
						{{ launch }}
					</li>
				</ul>
			</div>
			<div>Serial: {{ capsule.serial }}</div>
			<div>Type: {{ capsule.type }}</div>
		</div>
		<button
			@click="$emit('launch')"
			type="button"
			:disabled="capsule.type != 'Dragon 2.0'"
		>
			Launch
		</button>
	</article>
</template>
<style scoped>
	.card {
		border: 2px solid grey;
		padding: 1rem;
		border-radius: 2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.active {
		color: green;
	}
	.retired {
		color: darkorange;
	}
	.destroyed {
		color: grey;
	}
	.unknown {
		color: purple;
	}
</style>
