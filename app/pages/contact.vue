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
				</p>
			</nav>
		</header>

		<main>
			<h1>Привет!</h1>
			<h3>Свяжитесь со мной в любой сети!</h3>

			<p>
				<img
					src="https://avatars.githubusercontent.com/u/38175345?v=4"
					alt="ilya-avatar"
					class="contact-avatar"
				/>
			</p>

			<p>
				Если вы ищете информацию о моих проектах или технологиях, возможно,
				<a href="/projects/">проекты</a> содержит то, что вам нужно.
			</p>

			<p>
				Не можете найти то, что ищете, или просто хотите поздороваться? Не
				стесняйтесь написать мне. Я <em>онлайн</em> каждую секунду!
			</p>

			<p><a href="https://t.me/sonin_ilya" target="_blank">Мой телеграмм</a></p>
			<p>
				<a href="https://tenchat.ru/sonin_ilya" target="_blank">Мой tenchat</a>
			</p>
			<p>
				Мой email:
				<a href="mailto:sonin.ilya@gmail.com">sonin.ilya@gmail.com</a>
			</p>
		</main>

		<AppFooter />
	</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Контакты | ᕕ( ᐛ )ᕗ Блог Ильи',
	meta: [
		{
			name: 'description',
			content: 'Свяжитесь с Ильей Сониным - разработчиком веб-приложений.',
		},
	],
})
</script>

<style scoped>
.contact-avatar {
	width: 200px;
	height: 200px;
	border-radius: 50%;
	margin: 1em 0;
	display: block;
}

mark {
	background-color: var(--code-background-color);
	color: var(--code-color);
	padding: 0.2em 0.4em;
	border-radius: 3px;
	font-family: monospace;
	font-size: 1.1em;
}
</style>
