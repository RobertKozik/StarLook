import swapiFilm from "./swapiFilm";
import swapiSpecie from "./swapiSpecie";

interface swapiPersonDetails {
    homeworld: String;
	films: swapiFilm[];
	species: swapiSpecie[];
}

export default swapiPersonDetails;