import {Injectable} from "@nestjs/common";
import {IHotelRoomService, ISearchRoomsParams} from "./interfaces/hotel-room.interface";
import {ID} from "src/share/types/id.type";
import {HotelRoom, IHotelRoomDocument} from "./models/hotel.room";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {THotelDocument} from "./models/hotel";

@Injectable()
export class HotelRoomService implements IHotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private hotelRoomModel: Model<IHotelRoomDocument>
    ) {
    }

    create(data: Partial<HotelRoom>): Promise<HotelRoom> {
        const createdRoom = new this.hotelRoomModel(data);
        return createdRoom.save();
    }

    findById(id: ID): Promise<HotelRoom> {
        return this.hotelRoomModel.findById(id).exec();
    }

    search(params: ISearchRoomsParams): Promise<HotelRoom[]> {
        const modifiedParams = params;
        if (modifiedParams.isEnabled === undefined) {
            delete modifiedParams.isEnabled;
        }

        return this.hotelRoomModel.find({ modifiedParams }).exec();
    }

    update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.hotelRoomModel.findByIdAndUpdate(id, data).exec();
    }
}
