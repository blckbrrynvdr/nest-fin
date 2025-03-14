import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type BooksDocument = Books & Document;

@Schema()
export class Books {
	@Prop({required: true})
	public _id: string;

	@Prop({required: true})
	public title: string;

	@Prop()
	public description: string;

	@Prop()
	public authors: string;

	@Prop()
	public favorite: string;

	@Prop()
	public fileCover: string;

	@Prop()
	public fileName: string;

	@Prop()
	public fileBook: string;
}

export const BooksSchema = SchemaFactory.createForClass(Books);