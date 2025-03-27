import {UserModel} from "../models/user.model";
import {ID} from "../../../../share/types/id.type";

export interface SearchUserParams {
    limit: number;
    offset: number;
    email: string;
    name: string;
    contactPhone: string;
}
export interface IUserService {
    create(data: Partial<UserModel>): Promise<UserModel>;
    findById(id: ID): Promise<UserModel>;
    findByEmail(email: string): Promise<UserModel>;
    findAll(params: SearchUserParams): Promise<UserModel[]>;
}
