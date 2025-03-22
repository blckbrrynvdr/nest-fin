import {Injectable} from "@nestjs/common";
import {IHotelService, ISearchHotelParams, IUpdateHotelParams} from "./interfaces/hotel.interface";
import {HotelModel} from "./models/hotel.model";
import {Promise} from "mongoose";
import {ID} from "../../share/types/id.type";
import {HotelRepository} from "./repositories/hotel.repository";

@Injectable()
export class HotelService implements IHotelService {
    constructor(
        private hotelRepository: HotelRepository,
    ) {
    }
    create(data: Partial<HotelModel>): Promise<HotelModel> {
        return Promise.resolve(undefined);
    }

    findById(id: ID): Promise<HotelModel> {
        return Promise.resolve(undefined);
    }

    search(params: ISearchHotelParams): Promise<HotelModel[]> {
        return Promise.resolve([]);
    }

    update(id: ID, data: IUpdateHotelParams): Promise<HotelModel> {
        return Promise.resolve(undefined);
    }

}
