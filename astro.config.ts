import db from '@astrojs/db';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import orama from '@orama/plugin-astro'


// https://astro.build/config
export default defineConfig({
	integrations: [
		db(),
    orama({
      // We can generate more than one DB, with different configurations
      mydb: {
        // Required. Only pages matching this path regex will be indexed
        pathMatcher: /blog\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/.+$/,

        // Optional. 'english' by default
        language: 'spanish',

        // Optional. ['body'] by default. Use it to constraint what is used to
        // index a page.
        contentSelectors: ['h1', 'main'],
      },
    }),
		tailwind({
			nesting: true,
		}),
	],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
})
