import axios from "axios";
import { CardRequestModel, CardResponseModel } from "../models";

const _axios = axios.create({
    baseURL: "https://695e82b72556fd22f678ae35.mockapi.io/api",
    timeout: 10000,
});

export const ApiService = {

    GetBooks: async () => {
        const response = await _axios.get<CardResponseModel[]>("/books");
        return response.data;
    },

    CreateCard: async (payload: CardRequestModel) => {
        const response = await _axios.post<CardResponseModel>("/books", payload);
        return response.data;
    },

    UpdateBook: async (id: string, payload: CardRequestModel) => {
        const response = await _axios.put<CardResponseModel>(`/books/${id}`, payload);
        return response.data;
    },

    DeleteBook: async (id: string) => {
        const response = await _axios.delete(`/books/${id}`);
        return response.data;
    }
}