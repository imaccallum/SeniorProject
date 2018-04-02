import { User } from './user'

export interface Article {
	id?: string;
	created?: string;
	title: string;
	subtitle: string;
	contentUrl: string;
	contentRaw: string;
	contentHtml: string;
	user?: User;
	score?: number;
	tags: string[];
}