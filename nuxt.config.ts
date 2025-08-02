export default defineNuxtConfig({
	compatibilityDate: '2025-08-02',
	app: {
		head: {
			title: 'ᕕ( ᐛ )ᕗ Блог Ильи',
			htmlAttrs: {
				lang: 'ru',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					name: 'description',
					content:
						'Блог Ильи Сонина - разработчика веб-приложений. Статьи о технологиях, разработке и создании надёжных решений.',
				},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	nitro: {
		prerender: {
			routes: ['/'],
		},
	},

	runtimeConfig: {
		public: {
			cockpitApiUrl: process.env.COCKPIT_API_URL || '',
			cockpitApiKey: process.env.COCKPIT_API_KEY || '',
		},
	},

	css: ['~/assets/css/main.css'],

	modules: [],
})
