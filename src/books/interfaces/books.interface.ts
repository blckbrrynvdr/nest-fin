export interface Book {
	title: string,
	description: string,
	authors: string,
	favorite: string,
	fileCover: string,
	fileName: string,
	fileBook: string,
	_id : string,
}

export interface CreateBookRequestDto {
	title: Book['title'],
	description: Book['description'],
	authors: Book['authors'],
	favorite: Book['favorite'],
	fileCover: Book['fileCover'],
	fileName: Book['fileName'],
	fileBook: Book['fileBook'],
}

export interface UpdateBookRequestDto {
	title: Book['title'],
	description: Book['description'],
	authors: Book['authors'],
	favorite?: Book['favorite'],
	fileCover?: Book['fileCover'],
	fileName?: Book['fileName'],
	fileBook?: Book['fileBook'],
}

export interface GetBookRequestDto {
	id: string;
}