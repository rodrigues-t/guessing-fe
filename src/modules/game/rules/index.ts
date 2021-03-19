
export default class Rules {
    public guessLimitMin = 1;
    public guessLimitMax = 1;

    public isRateCorrected(givenRate: number, movieRate: number): boolean {       
        return (movieRate - this.guessLimitMin ) <= givenRate && givenRate <= (movieRate + this.guessLimitMax);
    }
}