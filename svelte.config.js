import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter({
			// see below for options that can be set here
		}),
		alias: {
			$lib: 'src/lib',
			$components: 'src/components'
		}
	}
};
