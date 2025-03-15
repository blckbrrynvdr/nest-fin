import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {BooksService} from "./books.service";
import {CreateBookRequestDto, UpdateBookRequestDto} from "./interfaces/books.interface";
import {BooksDocument} from "./schemas/books.schema";

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {
	}

	@Post()
	create(
		@Body() body: CreateBookRequestDto,
	): Promise<BooksDocument> {
		return this.booksService.createBook(body)
	}

	@Get()
	async getBooks(): Promise<BooksDocument[]> {
		return await this.booksService.getBooks();
	}

	@Get(':id')
	async getBook(
		@Param('id') id: string
	): Promise<BooksDocument> {
		return await this.booksService.getBook(id);
	}

	@Put(':id')
	updateBook(
		@Param('id') id: string,
		@Body() body: UpdateBookRequestDto,
	): Promise<BooksDocument> {
		return this.booksService.updateBook(id, body);
	}

	@Delete(':id')
	deleteBook(
		@Param('id') id: string,
	): Promise<string> {
		return this.booksService.deleteBook(id);
	}
}
