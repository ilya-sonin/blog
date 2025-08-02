export interface Article {
	_id: string
	title: string
	slug: string
	summary?: string
	content?: string
	created_date: string
	tags?: string[]
	popular?: boolean
	views?: number
}
