<template>
	<div>
		<header>
			<NuxtLink class="title" to="/">
				<h1>ᕕ( ᐛ )ᕗ Блог Ильи</h1>
			</NuxtLink>
			<nav>
				<p>
					<NuxtLink to="/">Главная</NuxtLink>
					<NuxtLink to="/blog/">Блог</NuxtLink>
					<NuxtLink to="/projects/">Проекты</NuxtLink>
					<NuxtLink to="/contact/">Контакты</NuxtLink>
				</p>
			</nav>
		</header>

		<main>
			<div v-if="pending" class="loading">Загрузка статьи...</div>

			<div v-else-if="error" class="error">
				Ошибка при загрузке статьи: {{ error.message }}
			</div>

			<div v-else-if="!article" class="not-found">
				<h1>Статья не найдена</h1>
				<p>Запрашиваемая статья не существует.</p>
				<NuxtLink to="/">Вернуться на главную</NuxtLink>
			</div>

			<article v-else class="article-content">
				<h1>{{ article.title }}</h1>

				<p>
					Дата публикации:
					<time :datetime="article.created_date">
						{{ formatDate(article.created_date) }} </time
					><br />
					<span v-if="article.tags && article.tags.length" class="tags">
						Теги: {{ article.tags.join(', ') }}
					</span>
				</p>

				<div class="article-body">
					<div v-html="parsedContent"></div>
				</div>
			</article>
		</main>

		<AppFooter />
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { getArticleBySlug, formatDate, incrementViews } = useArticles()

const {
	data: article,
	pending,
	error,
} = await useAsyncData(`article-${slug}`, () => getArticleBySlug(slug))

onMounted(() => {
	if (import.meta.client && article.value?._id) {
		incrementViews(article.value._id)
	}
})

watch(
	() => route.params.slug,
	async newSlug => {
		if (import.meta.client && newSlug && newSlug !== slug) {
			const newArticle = await getArticleBySlug(newSlug as string)
			if (newArticle?._id) {
				incrementViews(newArticle._id)
			}
		}
	}
)

const { parseMarkdown, sanitizeHtml } = await import('#shared/utils/markdown')

const parsedContent = computed(() => {
	if (!article.value?.content) return ''
	const html = parseMarkdown(article.value.content)
	return sanitizeHtml(html)
})

const copyHeaderLink = (anchorId: string) => {
	const currentUrl = window.location.href.split('#')[0]
	const linkToCopy = `${currentUrl}#${anchorId}`

	navigator.clipboard
		.writeText(linkToCopy)
		.then(() => {
			const anchorElement = document.querySelector(
				`[data-anchor-id="${anchorId}"]`
			)
			if (anchorElement) {
				anchorElement.classList.add('copied')
				setTimeout(() => {
					anchorElement.classList.remove('copied')
				}, 300)
			}
		})
		.catch(err => {
			console.error('Ошибка при копировании ссылки:', err)
		})
}

const addAnchorHandlers = () => {
	nextTick(() => {
		const anchors = document.querySelectorAll('.header-anchor')
		anchors.forEach(anchor => {
			anchor.addEventListener('click', anchorClickHandler)
		})
	})
}

const anchorClickHandler = (e: Event) => {
	e.preventDefault()
	const anchor = e.target as HTMLElement
	const anchorId = anchor.getAttribute('data-anchor-id')
	if (anchorId) {
		const currentUrl = window.location.href.split('#')[0]
		const newUrl = `${currentUrl}#${anchorId}`
		window.history.pushState({}, '', newUrl)

		const targetElement = document.getElementById(anchorId)
		if (targetElement) {
			targetElement.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}

		copyHeaderLink(anchorId)
	}
}

onMounted(() => {
	addAnchorHandlers()

	const hash = window.location.hash
	if (hash) {
		const anchorId = hash.substring(1)
		const targetElement = document.getElementById(anchorId)
		if (targetElement) {
			setTimeout(() => {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}, 100)
		}
	}
})

watch(parsedContent, () => {
	addAnchorHandlers()

	const hash = window.location.hash
	if (hash) {
		const anchorId = hash.substring(1)
		const targetElement = document.getElementById(anchorId)
		if (targetElement) {
			setTimeout(() => {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				})
			}, 100)
		}
	}
})

useHead(() => ({
	title: article.value?.title
		? `${article.value.title} | ᕕ( ᐛ )ᕗ Блог Ильи`
		: 'ᕕ( ᐛ )ᕗ Блог Ильи',
	meta: [
		{
			name: 'description',
			content: article.value?.summary || 'Статья из блога Ильи Сонина',
		},
	],
}))
</script>

<style scoped>
.loading,
.error,
.not-found {
	text-align: center;
	padding: 2em;
	color: var(--text-color);
}

.error {
	color: #d32f2f;
}

.not-found h1 {
	color: var(--text-color);
	margin-bottom: 1em;
}

.tags {
	color: var(--text-color);
	font-style: italic;
}

:deep(.article-image) {
	max-width: 100%;
	height: auto;
	border-radius: 8px;
	margin: 1.5em 0;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	display: block;
}

:deep(.article-image:hover) {
	transform: scale(1.02);
	transition: transform 0.2s ease;
}

:deep(h1, h2, h3, h4, h5, h6) {
	position: relative;
}

:deep(.header-anchor) {
	position: absolute;
	left: -1.5em;
	top: 50%;
	transform: translateY(-50%);
	opacity: 0.3;
	transition: opacity 0.2s ease;
	text-decoration: none;
	color: var(--text-color);
	font-size: 0.8em;
}

:deep(
		h1:hover .header-anchor,
		h2:hover .header-anchor,
		h3:hover .header-anchor,
		h4:hover .header-anchor,
		h5:hover .header-anchor,
		h6:hover .header-anchor
	) {
	opacity: 1;
}

/* Мобильные устройства */
@media (max-width: 768px) {
	:deep(.header-anchor) {
		left: auto;
		right: 0;
		font-size: 0.7em;
	}
}
</style>
