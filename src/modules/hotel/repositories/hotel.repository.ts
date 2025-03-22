import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {HotelModel, THotelDocument} from "../models/hotel.model";
import {Model} from "mongoose";
import {ID} from "../../../share/types/id.type";
import {ISearchHotelParams, IUpdateHotelParams} from "../interfaces/hotel.interface";

@Injectable()
export class HotelRepository {
    constructor(
        @InjectModel(HotelModel.name) private hotelModel: Model<THotelDocument>
    ) {
    }

    async create(data: Partial<HotelModel>): Promise<THotelDocument> {
        const createdHotel = new this.hotelModel(data);
        return createdHotel.save();
    }

    async findById(id: ID): Promise<THotelDocument> {
        return this.hotelModel.findById(id).exec();
    }

    async search(params: ISearchHotelParams ): Promise<THotelDocument[]> {
        return this.hotelModel.find({ params }).exec();
    }

    async update(id: ID, data: IUpdateHotelParams): Promise<THotelDocument> {
        return this.hotelModel.findByIdAndUpdate(id, data).exec();
    }
}
