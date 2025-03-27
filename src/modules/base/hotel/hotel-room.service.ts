import {Injectable} from "@nestjs/common";
import {IHotelRoomService, ISearchRoomsParams} from "./interfaces/hotel-room.interface";
import {ID} from "src/share/types/id.type";
import {HotelRoomModel, IHotelRoomDocument} from "./models/hotel-room.model";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoomModel.name) private hotelRoomModel: Model<IHotelRoomDocument>
    ) {
    }

    create(data: Partial<HotelRoomModel>): Promise<HotelRoomModel> {
        const createdRoom = new this.hotelRoomModel(data);
        return createdRoom.save();
    }

    findById(id: ID): Promise<HotelRoomModel> {
        return this.hotelRoomModel.findById(id).exec();
    }

    search(params: ISearchRoomsParams): Promise<HotelRoomModel[]> {
        const modifiedParams = params;
        if (modifiedParams.isEnabled === undefined) {
            delete modifiedParams.isEnabled;
        }

        return this.hotelRoomModel.find({ modifiedParams }).exec();
    }

    update(id: ID, data: Partial<HotelRoomModel>): Promise<HotelRoomModel> {
        return this.hotelRoomModel.findByIdAndUpdate(id, data).exec();
    }
}
