export default interface Movie {
    imdbID: string;
    title: string;
    poster: string;
    plot: string | null;
    imdbRating: number | null;
}