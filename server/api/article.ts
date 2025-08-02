export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const query = getQuery(event)

	try {
		const apiUrl = `${config.public.cockpitApiUrl}/content/items/articles`

		const params = new URLSearchParams({
			filter: JSON.stringify({ slug: query.slug }),
		})

		const response = await $fetch(`${apiUrl}?${params.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'api-key': config.public.cockpitApiKey,
			},
		})

		return response
	} catch (error) {
		console.error('Ошибка при получении статей из Cockpit:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при получении статей',
		})
	}
})
