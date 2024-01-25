export class Data{

    static async getSpecificFilmData(){
        const fetchedFilmData = await fetch('https://bgs.jedlik.eu/swapi/api/films/4')
        .then(resp => {
            return resp.json();
        })
        const data = fetchedFilmData;

        return data;
    }

    static async getAllFilmsData(){
        const fetchedAllFilmDatas = await fetch('https://bgs.jedlik.eu/swapi/api/films')
        .then(resp => {
            return resp.json();
        })
        const data = fetchedAllFilmDatas;

        return data;
    }

    static async getStarShipsData() {
        const fetchedStarShipsData = await fetch('https://bgs.jedlik.eu/swapi/api/starships')
        .then(resp => {
            return resp.json();
        })
        const data = fetchedStarShipsData;

        return data;
    }
    static async getVehiclesData() {
        const fetchedVehiclesData = await fetch('https://bgs.jedlik.eu/swapi/api/vehicles')
        .then(resp => {
            return resp.json();
        })
        const data = fetchedVehiclesData;

        return data;
    }
}