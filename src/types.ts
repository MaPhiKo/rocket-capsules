export type Capsule = {
	id: string;
	land_landings: number;
	last_update: string;
	launches: string[];
	reuse_count: number;
	serial: string;
	status: 'unknown' | 'active' | 'retired' | 'destroyed';
	type: 'Dragon 1.0' | 'Dragon 1.1' | 'Dragon 2.0';
	water_landings: number;
};
