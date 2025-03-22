import {ID} from "../../../share/types/id.type";
import {HotelRoomModel} from "../models/hotel-room.model";

export interface ISearchRoomsParams {
    limit: number;
    offset: number;
    hotel: ID;
    isEnabled?: boolean;
}

export interface IHotelRoomService {
    create(data: Partial<HotelRoomModel>): Promise<HotelRoomModel>;
    findById(id: ID): Promise<HotelRoomModel>;
    search(params: ISearchRoomsParams): Promise<HotelRoomModel[]>;
    update(id: ID, data: Partial<HotelRoomModel>): Promise<HotelRoomModel>;
}
