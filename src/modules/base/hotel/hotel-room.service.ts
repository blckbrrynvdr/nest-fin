import {Injectable} from "@nestjs/common";
import {IHotelRoomService, ISearchRoomsParams} from "./interfaces/hotel-room.interface";
import {ID} from "src/share/types/id.type";
import {HotelRoomModel, IHotelRoomDocument} from "./models/hotel-room.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model, Types} from "mongoose";

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoomModel.name) private hotelRoomModel: Model<IHotelRoomDocument>
    ) {
    }

    create(data: Partial<HotelRoomModel>): Promise<HotelRoomModel> {
        const date = Date.now();
        const saveData = {
            ...data,
            _id: new Types.ObjectId().toString(),
            createdAt: date,
            updatedAt: date,
        };
        const createdRoom = new this.hotelRoomModel(saveData);
        return createdRoom.save();
    }

    findById(id: ID): Promise<HotelRoomModel> {
        return this.hotelRoomModel.findById(id).exec();
    }

    search(params: ISearchRoomsParams): Promise<HotelRoomModel[]> {
        const { limit, offset, hotel, isEnabled } = params;
        
        const filter: any = {
            hotel: hotel
        };
        
        if (isEnabled !== undefined) {
            filter.isEnabled = isEnabled;
        }
        
        return this.hotelRoomModel
            .find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
    }

    update(id: ID, data: Partial<HotelRoomModel>): Promise<HotelRoomModel> {
        return this.hotelRoomModel.findByIdAndUpdate(id, data).exec();
    }
}
