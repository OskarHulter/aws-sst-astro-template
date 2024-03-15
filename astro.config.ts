import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
	integrations: [
    db(),
		tailwind({
			nesting: true,
		}),
	],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
})
