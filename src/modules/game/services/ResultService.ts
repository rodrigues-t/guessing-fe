import { Api } from "@/shared/services/Api";
import GameResult from "../models/GameResult";

export default class ResultService extends Api {
    public async getResults(): Promise<any> {
        return await this.get('/result');
    }

    public async postResult(result: GameResult): Promise<any> {
        return await this.post('/result', result);
    }
}