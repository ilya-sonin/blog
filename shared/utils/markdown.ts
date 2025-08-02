import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-toc-done-right'

function transliterateRussian(text: string): string {
	const russianToLatin: { [key: string]: string } = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'yo',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'sch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
		А: 'A',
		Б: 'B',
		В: 'V',
		Г: 'G',
		Д: 'D',
		Е: 'E',
		Ё: 'Yo',
		Ж: 'Zh',
		З: 'Z',
		И: 'I',
		Й: 'Y',
		К: 'K',
		Л: 'L',
		М: 'M',
		Н: 'N',
		О: 'O',
		П: 'P',
		Р: 'R',
		С: 'S',
		Т: 'T',
		У: 'U',
		Ф: 'F',
		Х: 'H',
		Ц: 'Ts',
		Ч: 'Ch',
		Ш: 'Sh',
		Щ: 'Sch',
		Ъ: '',
		Ы: 'Y',
		Ь: '',
		Э: 'E',
		Ю: 'Yu',
		Я: 'Ya',
	}

	return text
		.split('')
		.map(char => russianToLatin[char] || char)
		.join('')
}

function slugify(text: string): string {
	return transliterateRussian(text)
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '')
}

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true,
})
	.use(anchor, {
		permalinkSymbol: '§',
		permalinkClass: 'header-anchor',
		permalinkBefore: true,
		slugify: slugify,
		permalink: true,
	})
	.use(toc, {
		level: [1, 2, 3],
		containerClass: 'toc',
		containerId: 'toc',
		listType: 'ul',
		slugify: slugify,
	})

export function parseMarkdown(content: string): string {
	if (!content) return ''
	let html = md.render(content)

	html = html.replace(
		/<a class="header-anchor" href="#([^"]+)">§<\/a>/g,
		'<a class="header-anchor" href="#$1" data-anchor-id="$1">§</a>'
	)

	html = html
		.replace(/<table>/g, '<div class="table-container"><table>')
		.replace(/<\/table>/g, '</table></div>')
		.replace(/<img([^>]*)>/g, '<img$1 class="article-image" loading="lazy" draggable="false">')

	return html
}

export function getTableOfContents(content: string): string {
	if (!content) return ''
	const tokens = md.parse(content, {})
	const tocTokens = tokens.filter(token => token.type === 'toc')
	return tocTokens.length > 0
		? md.renderer.render(tocTokens, md.options, {})
		: ''
}

export function sanitizeHtml(html: string): string {
	return html
		.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
		.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
		.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
		.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
}

export function extractMetadata(content: string): {
	title?: string
	description?: string
	tags?: string[]
} {
	const lines = content.split('\n')
	const metadata: any = {}

	for (const line of lines) {
		if (line.startsWith('---')) break

		const match = line.match(/^([^:]+):\s*(.+)$/)
		if (match && match[1] && match[2]) {
			const [, key, value] = match
			const cleanKey = key.trim().toLowerCase()
			const cleanValue = value.trim()

			if (cleanKey === 'title') {
				metadata.title = cleanValue
			} else if (cleanKey === 'description') {
				metadata.description = cleanValue
			} else if (cleanKey === 'tags') {
				metadata.tags = cleanValue.split(',').map(tag => tag.trim())
			}
		}
	}

	return metadata
}
