import {Injectable} from "@nestjs/common";
import {IHotelService, ISearchHotelParams, IUpdateHotelParams} from "./interfaces/hotel.interface";
import {Hotel, THotelDocument} from "./models/hotel";
import {Model} from "mongoose";
import {ID} from "../../share/types/id.type";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(Hotel.name) private hotelModel: Model<THotelDocument>
    ) {
    }
    create(data: Partial<Hotel>): Promise<Hotel> {
        const createdHotel = new this.hotelModel(data);
        return createdHotel.save();
    }

    findById(id: ID): Promise<Hotel> {
        return this.hotelModel.findById(id).exec();
    }

    search(params: ISearchHotelParams): Promise<Hotel[]> {
        return this.hotelModel.find({ params }).exec();
    }

    update(id: ID, data: IUpdateHotelParams): Promise<Hotel> {
        return this.hotelModel.findByIdAndUpdate(id, data).exec();
    }

}
