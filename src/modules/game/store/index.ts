import { Module, VuexModule, Mutation, Action, getModule } from "vuex-module-decorators"
import store from "@/store";
import Movie from "../models/Movie";
import MovieService from "../services/MovieService";

@Module({
    namespaced: true,
    name: 'gameStore',
    store,
    dynamic: true,
})
class GameStore extends VuexModule {
    public userName: string | null = null;
    public searchTerm: string | null = null;
    public movies: Array<Movie> | null = null;
    public moviesLoading = false;
    
    // Mutations

    @Mutation
    public SET_USER_NAME(userName: string): void {
        this.userName = userName;
    }

    @Mutation
    public SET_SEARCH_TERM(searchTerm: string): void {
        this.searchTerm = searchTerm;
    }

    @Mutation
    public SET_MOVIES(movies: Array<Movie>): void {
        this.movies = movies;
    }

    @Mutation 
    public SET_MOVIES_LOADING(isLoading: boolean): void {
        this.moviesLoading = isLoading;
    }

    // Actions

    @Action
    public setUserName(userName: string): void {
        this.context.commit('SET_USER_NAME', userName);
    }

    @Action
    public setSearchTerm(searchTerm: string): void {
        this.context.commit('SET_SEARCH_TERM', searchTerm);
    }

    @Action({rawError: true})
    async getMovies(searchTerm: string): Promise<any> {
        try {
            this.context.commit('SET_MOVIES_LOADING', true);
            const response = await new MovieService().getMoviesBySearchTerm(searchTerm);
            const movies: Array<Movie> = response.data;
            this.context.commit('SET_MOVIES', movies);
        } catch (e) {
            return Promise.reject(e.response);
        } finally {
            this.context.commit('SET_MOVIES_LOADING', false);
        }
    }

    @Action setMovies(movies: Array<Movie>): void {
        this.context.commit('SET_MOVIES', movies);
    }
}

export default getModule(GameStore);