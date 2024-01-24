export class Data{

    static async getFilmData(){
        const fetchedFilmData = await fetch('https://bgs.jedlik.eu/swapi/api/films/4')
        .then(resp => {
            return resp.json();
        })
        const data = fetchedFilmData;

        return data[0];
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