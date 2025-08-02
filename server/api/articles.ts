export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = getQuery(event)

	try {
		const apiUrl = config.public.cockpitApiUrl
		const apiKey = config.public.cockpitApiKey

		if (!apiUrl || !apiKey) {
			console.warn('Переменные окружения Cockpit не настроены, возвращаем пустой массив')
			return { entries: [] }
		}

		const fullApiUrl = `${apiUrl}/content/items`

		const params = new URLSearchParams({
			models: JSON.stringify({ articles: {} }),
		})

		if (query.limit) {
			params.append('limit', query.limit as string)
		}

		const response = await $fetch(`${fullApiUrl}?${params.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'api-key': apiKey,
			},
		})

		return response
	} catch (error) {
		console.error('Ошибка при получении статей из Cockpit:', error)
		
		if (process.env.NODE_ENV === 'production' || process.env.NITRO_PRESET === 'static') {
			console.warn('В режиме production/static возвращаем пустой массив')
			return { entries: [] }
		}
		
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении статей',
		})
	}
})
