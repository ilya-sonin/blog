import { initToolbar } from '@stagewise/toolbar'

export default defineNuxtPlugin(() => {
	if (process.env.NODE_ENV === 'development') {
		initToolbar({
			plugins: [],
		})
	}
})
