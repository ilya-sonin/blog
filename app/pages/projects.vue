<template>
	<div>
		<header>
			<NuxtLink class="title" to="/">
				<h1>ᕕ( ᐛ )ᕗ Блог Ильи</h1>
			</NuxtLink>
			<nav>
				<p><NuxtLink to="/">Главная</NuxtLink> <NuxtLink to="/blog/">Блог</NuxtLink> <NuxtLink to="/projects/">Проекты</NuxtLink> <NuxtLink to="/contact/">Контакты</NuxtLink></p>
			</nav>
		</header>

		<main>
			<h1>Проекты</h1>

			<h3>Основные проекты</h3>

			<ul>
				<li>
					<strong>Веб-конструктор (Vue 2 + Python/Lua)</strong>
					- Уникальный веб-конструктор на Vue 2 с Vuex, Vue Router и DevExtreme. Реализовал масштабируемую архитектуру, адаптируемую под монолит и микросервисный подход. Backend на Python и Lua с быстрой маршрутизацией через nginx upstream module. Конструктор стал внутренним стандартом компании для разработки CRM/ERP-систем, клиентских порталов и внутренних сервисов.
				</li>
				<li>
					<strong>Корпоративная CRM-система (PHP 8+ Laravel)</strong>
					- Серверная часть на PHP 8+ с Laravel, REST API для управления пользовательскими ролями, авторизацией и CRUD-интерфейсами. Создал модуль импорта/экспорта данных с валидацией, снизивший количество ошибок на 80%. Оптимизировал SQL-запросы и кеширование через Redis, ускорив время отклика API до 200 мс.
				</li>
				<li>
					<strong>WordPress CMS и Headless API</strong>
					- Разработка кастомных тем и плагинов для отдела контента и маркетинга. Интеграция с внешними системами (CRM, email-рассылки, формы захвата), настройка webhooks и автоматизация контентных сценариев. Создал универсальный шаблон для лендингов с редактором блоков, позволивший маркетологам самостоятельно собирать страницы.
				</li>
			</ul>

			<h3>Оптимизация и рефакторинг</h3>

			<ul>
				<li>
					<strong>Миграция на современный стек (Vue 3 + TypeScript)</strong>
					- Мигрировал проекты с Webpack 2 на Vite, частично перевёл кодовую базу на Vue 3 (Composition API), TypeScript, Pinia, применяя Feature-Sliced Design (FSD). Внедрил корпоративные компоненты дизайна и унифицированные шаблоны, сократив время разработки на 60%.
				</li>
				<li>
					<strong>CI/CD и тестирование</strong>
					- Настроил CI/CD-процессы с unit-тестированием на Jest и Vitest, добившись покрытия до 99%. Использовал prompt-инжиниринг для генерации тестов. Подключил Laravel Horizon для мониторинга очередей, обеспечив стабильность фоновых задач.
				</li>
				<li>
					<strong>Рефакторинг веб-сайта (Nuxt 2)</strong>
					- Провёл рефакторинг веб-сайта на Nuxt 2 с Vuex. Реализовал стратегии клиентского и серверного кэширования, сократив нагрузку на API. Адаптировал интерфейс по макетам Figma с SCSS и Vuetify, обеспечив кросс-платформенную совместимость и SEO-требования.
				</li>
			</ul>

			<h3>Достижения в производительности</h3>

			<ul>
				<li>
					<strong>Оптимизация Core Web Vitals</strong>
					- Скорость загрузки страниц выросла на 75% благодаря оптимизации кода, ленивой загрузке компонентов и кэшированию критических ресурсов. Показатели Core Web Vitals улучшились за счёт снижения CLS (Cumulative Layout Shift) и оптимизации CSS/JS-бандлов, что положительно отразилось на поисковом ранжировании.
				</li>
			</ul>
		</main>

		<AppFooter />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Проекты | ᕕ( ᐛ )ᕗ Блог Ильи',
	meta: [
		{
			name: 'description',
			content: 'Проекты Ильи Сонина - разработчика веб-приложений. Текущие и завершенные проекты.',
		},
	],
})
</script>

<style scoped>
h3 {
	margin-top: 2em;
	margin-bottom: 0.5em;
}

h4 {
	margin-top: 1.5em;
	margin-bottom: 0.5em;
	font-size: 1.1em;
}

ul {
	margin-bottom: 2em;
}

li {
	margin-bottom: 0.8em;
}

li a {
	font-weight: 600;
}
</style> 