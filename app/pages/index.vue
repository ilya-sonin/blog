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
			<h1>Илья Сонин</h1>
			<h3>Веб-разработчик, который создаёт решения, а не просто код</h3>

			<div class="intro">
				<p>
					Имею более 5 лет опыта в создании, развитии и масштабировании веб-приложений с фокусом на производительность, UX и бизнес-цели. Моим ключевым достижением стало проектирование и внедрение мощного веб-конструктора, который был принят как корпоративный стандарт и активно используется в продакшене.
				</p>
			</div>

			<div class="tech-stack">
				<h3>Технологический стек</h3>
				<div class="stack-grid">
					<div class="stack-category">
						<h4>Frontend</h4>
						<p>Vue 2/3, Vuex/Pinia, TypeScript, SCSS, Webpack/Vite, Tailwind</p>
					</div>
					<div class="stack-category">
						<h4>Backend</h4>
						<p>PHP 8+, Laravel, REST API, GraphQL, MySQL/PostgreSQL, Redis</p>
					</div>
					<div class="stack-category">
						<h4>DevOps & Инфраструктура</h4>
						<p>Docker, CI/CD (GitLab CI, GitHub Actions), NGINX, Git</p>
					</div>
					<div class="stack-category">
						<h4>Качество кода</h4>
						<p>TDD, PHPUnit, SOLID, DRY, pixel-perfect, mobile-first</p>
					</div>
				</div>
			</div>

			<div class="approach">
				<h3>Мой подход к работе</h3>
				<ul>
					<li><strong>Архитектурное мышление:</strong> Строю продуманные архитектуры с прицелом на масштабируемость</li>
					<li><strong>Чистый код:</strong> Всегда стремлюсь к поддерживаемому коду с упором на тестируемость</li>
					<li><strong>Системность:</strong> Обожаю структуру: планирую задачи, учитываю риски и ищу оптимальные решения</li>
					<li><strong>Адаптивность:</strong> Быстро адаптируюсь к изменениям и легко встраиваюсь в существующую команду</li>
				</ul>
			</div>

			<div class="cta">
				<p>
					Ищу проекты и команды, где ценится технологическая зрелость, свобода в принятии решений и осмысленная разработка, а не бег по фичам ради фич.
				</p>
			</div>

			<div v-if="pending" class="loading">Загрузка статей...</div>

			<div v-else-if="error" class="error">
				Ошибка при загрузке статей: {{ error.message }}
			</div>

			<div v-else-if="articles && articles.length > 0">
				<div v-if="popularArticles.length > 0">
					<h3>Мои популярные статьи</h3>
					<ul>
						<li v-for="article in popularArticles" :key="article._id">
							<NuxtLink :to="`/article/${article.slug.replace(/^\//, '')}`">
								{{ article.title }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<h3>Мои последние статьи</h3>
				<ul>
					<li v-for="article in articles" :key="article._id">
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
	title: 'ᕕ( ᐛ )ᕗ Блог Ильи',
	meta: [
		{
			name: 'description',
			content:
				'Блог Ильи Сонина - разработчика веб-приложений. Статьи о технологиях, разработке и создании надёжных решений.',
		},
	],
})

const { getArticles } = useArticles()

const {
	data: articles,
	pending,
	error,
} = await useAsyncData('articles', () => getArticles(20))

const popularArticles = computed(() => {
	if (!articles.value) return []
	return articles.value.filter(article => article.popular === true)
})
</script>

<style scoped>
.intro {
	margin-bottom: 2em;
}

.tech-stack {
	margin-bottom: 2em;
}

.stack-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 1.5em;
	margin-top: 1em;
}

.stack-category {
	padding: 1.5em;
	background: var(--bg-secondary);
	border-radius: 8px;
	border-left: 4px solid var(--accent-color);
}

.stack-category h4 {
	margin: 0 0 0.5em 0;
	color: var(--accent-color);
	font-size: 1.1em;
}

.stack-category p {
	margin: 0;
	font-size: 0.9em;
	line-height: 1.5;
}

.approach {
	margin-bottom: 2em;
}

.approach ul {
	list-style: none;
	padding: 0;
}

.approach li {
	margin-bottom: 1em;
	padding-left: 1.5em;
	position: relative;
}

.approach li::before {
	content: "→";
	position: absolute;
	left: 0;
	color: var(--accent-color);
	font-weight: bold;
}

.cta {
	margin-bottom: 2em;
	padding: 1.5em;
	background: var(--bg-secondary);
	border-radius: 8px;
	border: 1px solid var(--border-color);
}

.cta p {
	margin: 0;
	font-style: italic;
}

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
</style>
