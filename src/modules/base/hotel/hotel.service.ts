import {Injectable} from "@nestjs/common";
import {IHotelService, ISearchHotelParams, IUpdateHotelParams} from "./interfaces/hotel.interface";
import {HotelModel, THotelDocument} from "./models/hotel.model";
import {Model, Types} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {ID} from "../../../share/types/id.type";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        @InjectModel(HotelModel.name) private hotelModel: Model<THotelDocument>
    ) {
    }
    create(data: Partial<HotelModel>): Promise<HotelModel> {
        const date = Date.now();
        const saveData = {
            ...data,
            _id: new Types.ObjectId().toString(),
            createdAt: date,
            updatedAt: date,
        }
        const createdHotel = new this.hotelModel(saveData);
        return createdHotel.save();
    }

    findById(id: ID): Promise<HotelModel> {
        return this.hotelModel.findById(id).exec();
    }

    search(params: ISearchHotelParams): Promise<HotelModel[]> {
        const { limit, offset, title } = params;
        
        const filter: any = {};
        if (title) {
            filter.title = title;
        }
        
        return this.hotelModel
            .find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
    }

    update(id: ID, data: IUpdateHotelParams): Promise<HotelModel> {
        return this.hotelModel.findByIdAndUpdate(id, data).exec();
    }

}
