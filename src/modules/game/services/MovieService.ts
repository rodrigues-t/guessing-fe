import { Api } from "@/shared/services/Api";

export default class MovieService extends Api {
    public async getMoviesBySearchTerm(searchTerm: string): Promise<any> {
        return await this.get(`/movie/search/${searchTerm}`);
    }
}