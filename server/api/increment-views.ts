export default defineEventHandler(async event => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	try {
		const apiUrl = `${config.public.cockpitApiUrl}/content/item/articleslikecollections`

		const response = await $fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': config.public.cockpitApiKey,
			},
			body: {
				data: {
					article_id: body.article_id,
				},
			},
		})

		return response
	} catch (error) {
		console.error('Ошибка при увеличении просмотров:', error)
		throw createError({
			statusCode: 500,
			statusMessage: 'Ошибка при увеличении просмотров',
		})
	}
})
