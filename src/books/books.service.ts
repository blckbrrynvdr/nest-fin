import {Injectable} from "@nestjs/common";
import {Book, CreateBookRequestDto, UpdateBookRequestDto} from "./interfaces/books.interface";
import {InjectConnection, InjectModel} from "@nestjs/mongoose";
import {Books, BooksDocument} from "./schemas/books.schema";
import {Connection, Model} from "mongoose";

@Injectable()
export class BooksService {
	constructor(
		@InjectModel(Books.name) private BooksModel: Model<BooksDocument>,
		@InjectConnection() private connection: Connection
	) {
	}

	async createBook(data: CreateBookRequestDto): Promise<BooksDocument> {
		const book = new this.BooksModel(data);

		return await book.save();
	}

	async getBooks(): Promise<BooksDocument[]> {
		return await this.BooksModel.find().select('-__v');
	}

	async getBook(id: string): Promise<BooksDocument> {
		return await this.BooksModel.findById(id).select('-__v');
	}

	async updateBook(id: string, book: UpdateBookRequestDto): Promise<BooksDocument> {
		return await this.BooksModel.findByIdAndUpdate(id, book).select('-__v');
	}

	async deleteBook(id: string): Promise<string> {
		await this.BooksModel.deleteOne({_id: id});
		return id;
	}
}