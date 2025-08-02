import type { Article } from '#shared/interfaces/article'

export const useArticles = () => {
	const getArticles = async (limit?: number): Promise<Article[]> => {
		try {
			const params: any = {}
			if (limit) params.limit = limit

			const response = await $fetch<{ articles: Article[] }>('/api/articles', {
				params,
			})

			const sortedArticles = (response.articles || []).sort((a, b) => {
				const dateA = new Date(a.created_date)
				const dateB = new Date(b.created_date)
				return dateB.getTime() - dateA.getTime()
			})

			return sortedArticles
		} catch (error) {
			console.error('Ошибка при получении статей:', error)
			return []
		}
	}

	const getArticleBySlug = async (slug: string): Promise<Article | null> => {
		try {
			const searchSlug = slug.startsWith('/') ? slug : `/${slug}`
			const response = await $fetch<Article[]>('/api/article', {
				params: { slug: searchSlug },
			})

			return response[0] || null
		} catch (error) {
			console.error('Ошибка при получении статьи:', error)
			return null
		}
	}

	const getAllSlugs = async (): Promise<string[]> => {
		try {
			const articles = await getArticles(1000)
			return articles
				.map(article => article.slug.replace(/^\//, ''))
				.filter(Boolean)
		} catch (error) {
			console.error("Ошибка при получении slug'ов:", error)
			return []
		}
	}

	const incrementViews = async (articleId: string): Promise<void> => {
		if (!import.meta.client) return

		try {
			const viewedArticles = JSON.parse(
				localStorage.getItem('viewedArticles') || '[]'
			)
			if (viewedArticles.includes(articleId)) {
				return
			}

			await $fetch('/api/increment-views', {
				method: 'POST',
				body: {
					article_id: articleId,
				},
			})

			viewedArticles.push(articleId)
			localStorage.setItem('viewedArticles', JSON.stringify(viewedArticles))
		} catch (error) {
			console.error('Ошибка при увеличении просмотров:', error)
		}
	}

	const formatDate = (dateString: string): string => {
		if (!dateString) return ''

		const date = new Date(dateString)
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()

		return `${day}.${month}.${year}`
	}

	return {
		getArticles,
		getArticleBySlug,
		getAllSlugs,
		incrementViews,
		formatDate,
	}
}
