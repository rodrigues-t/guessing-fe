/* eslint-disable @typescript-eslint/no-explicit-any*/
import axios from "axios";

export abstract class Api {
    protected baseUrl = process.env.VUE_APP_API_BASE_URL;

    protected async get(route: string, params?: unknown, headers?: unknown): Promise<any> {
        return await axios.get(`${this.baseUrl}${route}`, {
            params: params ? params : null,
            headers: headers ? headers : null,
        })
    }
}