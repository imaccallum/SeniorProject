export interface Base {
	id: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}

export class BaseProperties implements Base {
	id: string;
	createdAt?: string;
	updatedAt?: string;
	deletedAt?: string;
}