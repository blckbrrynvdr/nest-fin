import {Injectable} from "@nestjs/common";
import {IHotelService, ISearchHotelParams, IUpdateHotelParams} from "./interfaces/hotel.interface";
import {HotelModel, THotelDocument} from "./models/hotel.model";
import {Model} from "mongoose";
import {ID} from "../../share/types/id.type";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(HotelModel.name) private hotelModel: Model<THotelDocument>
    ) {
    }
    create(data: Partial<HotelModel>): Promise<HotelModel> {
        const createdHotel = new this.hotelModel(data);
        return createdHotel.save();
    }

    findById(id: ID): Promise<HotelModel> {
        return this.hotelModel.findById(id).exec();
    }

    search(params: ISearchHotelParams): Promise<HotelModel[]> {
        return this.hotelModel.find({ params }).exec();
    }

    update(id: ID, data: IUpdateHotelParams): Promise<HotelModel> {
        return this.hotelModel.findByIdAndUpdate(id, data).exec();
    }

}
