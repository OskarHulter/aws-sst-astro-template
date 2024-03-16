import { defineConfig } from "astro/config"
import aws from "astro-sst"
import db from '@astrojs/db'
import tailwind from '@astrojs/tailwind';


// https://astro.build/config
export default defineConfig({
	integrations: [
    db(),
		tailwind({
			nesting: true,
		}),
	],
	output: 'server',
  adapter: aws(), // node({ mode: 'standalone', }),
})
