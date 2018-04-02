import { Article } from './article'

export interface ArticleList {
	page: number;
	pageCount: number;
	pageSize: number;
	articles: Article[];
	articleCount: number;
	search?: string;
}