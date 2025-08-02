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
			<h1>Блог</h1>

			<div v-if="pending" class="loading">Загрузка статей...</div>

			<div v-else-if="error" class="error">
				Ошибка при загрузке статей: {{ error.message }}
			</div>

			<div v-else-if="articles && articles.length > 0">
				<input
					v-model="searchTerm"
					type="text"
					id="searchInput"
					placeholder="Search..."
					class="search-input"
				/>

				<ul class="blog-posts">
					<li v-for="article in filteredArticles" :key="article._id">
						<span>{{ formatDate(article.created_date) }}</span>
						<NuxtLink :to="`/article/${article.slug.replace(/^\//, '')}`">
							{{ article.title }}
						</NuxtLink>
					</li>
				</ul>
			</div>

			<div v-else class="no-articles">
				<p>Статьи не найдены.</p>
			</div>
		</main>

		<AppFooter />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Блог | ᕕ( ᐛ )ᕗ Блог Ильи',
	meta: [
		{
			name: 'description',
			content: 'Все статьи из блога Ильи Сонина - разработчика веб-приложений.',
		},
	],
})

const { getArticles, formatDate } = useArticles()

const {
	data: articles,
	pending,
	error,
} = await useAsyncData('blog-articles', () => getArticles(50))

const searchTerm = ref('')

const filteredArticles = computed(() => {
	if (!articles.value) return []
	if (!searchTerm.value) return articles.value

	return articles.value.filter(
		article =>
			article.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
			(article.summary &&
				article.summary.toLowerCase().includes(searchTerm.value.toLowerCase()))
	)
})
</script>

<style scoped>
.loading,
.error,
.no-articles {
	text-align: center;
	padding: 2em;
	color: var(--text-color);
}

.error {
	color: #d32f2f;
}

.search-input {
	width: 100%;
	padding: 0.5em;
	margin-bottom: 1em;
	border: 1px solid var(--text-color);
	border-radius: 4px;
	background: var(--background-color);
	color: var(--text-color);
	font-family: var(--font-secondary);
	font-size: 1em;
}

.search-input:focus {
	outline: none;
	border-color: var(--link-color);
}

.search-input::placeholder {
	color: var(--text-color);
	opacity: 0.7;
}
</style>
