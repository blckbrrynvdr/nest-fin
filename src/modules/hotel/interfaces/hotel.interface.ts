import {ID} from "../../../share/types/id.type";
import {HotelModel} from "../models/hotel.model";

export interface ICreateHotelParams {
    title: string;
    description?: string;
}

export interface ISearchHotelParams {
    limit: number;
    offset: number;
    title: string;
}

export interface IUpdateHotelParams {
    title: string;
    description: string;
}

export interface IHotelService {
    create(data: Partial<HotelModel>): Promise<HotelModel>;
    findById(id: ID): Promise<HotelModel>;
    search(params: ISearchHotelParams): Promise<HotelModel[]>;
    update(id: ID, data: IUpdateHotelParams): Promise<HotelModel>;
}
