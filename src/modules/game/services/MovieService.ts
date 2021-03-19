import { Api } from "@/shared/services/Api";
import GameResult from "../models/GameResult";

export default class MovieService extends Api {
    public async getMoviesBySearchTerm(searchTerm: string): Promise<any> {
        return await this.get(`/movie/search/${searchTerm}`);
    }

    public async getMovieById(movieId: string): Promise<any> {
        return await this.get(`/movie/find/${movieId}`);
    }

    public async postResult(result: GameResult): Promise<any> {
        return await this.post('/result', result);
    }
}