import { useEffect, useState } from "react";
import DetailsProps from "../../helpers/DetailsProps";
import swapiFilm from "../../helpers/swapiFilm";
import swapiPersonDetails from "../../helpers/swapiPersonDetails";
import swapiSpecie from "../../helpers/swapiSpecie";

const Details = ({Person}: DetailsProps) => {
    const [details, setDetails] = useState<swapiPersonDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        let promises = Person!.films.map(uri => fetch(changeToHttps(uri)));
        promises = promises.concat(Person!.species.map(uri => fetch(changeToHttps(uri))));
        promises.push(fetch(changeToHttps(Person!.homeworld)));
        Promise.all(promises).then(res => Promise.all(res.map(r => r.json())))
        .then (
            (result) => {
                let newDetails:swapiPersonDetails = { films: [], species: [], homeworld: ""};
                result.forEach((el,key) => {
                    if(key < Person!.films.length) {
                        newDetails.films.push({title: el.title})
                    } else if( key <promises.length - 1) {
                        newDetails.species.push({name: el.name, average_lifespan: el.average_lifespan});
                    } else {
                        newDetails.homeworld = el.name;
                    }      
                })
                setDetails(newDetails);
            })
        .then(() => {
            setIsLoading(false);
            })
    },[Person])

    if(!isLoading) {
        return (
            <div>
                <h1>{Person?.name}</h1>
                <ol>
                    {details!.films.map((el,key) => {
                        return (<li key={key}>{el.title}</li>)
                    })}
                </ol>
                <ol>
                    {details!.species.map((el,key) => {
                        return (<li key={key}>{el.name}</li>)
                    })}
                </ol>
                <p>{details!.homeworld}</p>
            </div>
        )
    }
    return (
        <h1> Loading... </h1>
    )
}

const changeToHttps = (uri: string):string => {
    return 'https'+uri.slice(4);
}

export default Details;