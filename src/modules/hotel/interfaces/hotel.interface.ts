import {ID} from "../../../share/types/id.type";
import {Hotel} from "../models/hotel";

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
    create(data: Partial<Hotel>): Promise<Hotel>;
    findById(id: ID): Promise<Hotel>;
    search(params: ISearchHotelParams): Promise<Hotel[]>;
    update(id: ID, data: IUpdateHotelParams): Promise<Hotel>;
}
