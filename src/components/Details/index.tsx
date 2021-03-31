import { useEffect, useState } from "react";
import DetailsProps from "../../helpers/DetailsProps";
import swapiPersonDetails from "../../helpers/swapiPersonDetails";
import LoadingIndicator from "../LoadingIndicator";

import './style.css';

const Details = ({Person}: DetailsProps) => {
    const [details, setDetails] = useState<swapiPersonDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        let promises: Promise<any>[] = Person!.films.map(uri => fetch(changeToHttps(uri)));
        promises = promises.concat(Person!.species.map(uri => fetch(changeToHttps(uri))));
        promises.push(fetch(changeToHttps(Person!.homeworld)));
        Promise.all(promises).then(res => Promise.all(res.map(r => r.json())))
        .then (
            (result) => {
                let newDetails:swapiPersonDetails = { films: [], species: [], homeworld: ""};
                result.forEach((el:any,key:number) => {
                    //first promises are films to fetch
                    if(key < Person!.films.length) {
                        newDetails.films.push({title: el.title, url: el.url})
                    // next are species
                    } else if( key <promises.length - 1) {
                        newDetails.species.push({name: el.name, average_lifespan: el.average_lifespan});
                    //last one is homeworld
                    } else {
                        newDetails.homeworld = el.name;
                    }      
                })
                setDetails(newDetails);
            })
        .then(() => {
            //when done, set loading state to false - all data loaded
            setIsLoading(false);
            })
    },[Person])

    if(!isLoading) {
        return (
            <div className="details_wrapper">
                <div className="details_inner_wrapper">
                    <h1>{Person?.name}</h1>
                    <div className="list_outer_wrapper">
                        <div className="list_inner_wrapper">
                            <div className="details_element">
                                <label>films: </label>
                                <ul className="film_list">
                                    {details!.films.map((el,key) => {
                                        return (<li key={key}>{el.title}</li>)
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="list_inner_wrapper">
                            <div className="details_element">
                                <label>spiece: </label>
                                <ul className="spieces_list">
                                    {details!.species.map((el,key) => {
                                        return (<li key={key}>{el.name}</li>)
                                    })}
                                </ul>
                            </div>
                            <div className="details_element">
                                <label>eye color: </label>
                                <ul>
                                    <li>{Person!.eye_color}</li>
                                </ul>
                            </div>
                            <div className="details_element">
                                <label>mass: </label>
                                <ul>
                                    <li>{Person!.mass}</li>
                                </ul>
                            </div>
                            <div className="details_element">
                                <label>skin color: </label>
                                <ul>
                                    <li>{Person!.skin_color}</li>
                                </ul>
                            </div>
                            <div className="details_element">
                                <label>birth year: </label>
                                <ul>
                                    <li>{Person!.birth_year}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <h2 className="homeworld"><label>homeworld: </label>{details!.homeworld}</h2>
                </div>
            </div>
        )
    }
    return (
        <div className="details_wrapper">
            <div className="loading_outer_wrapper">
                <LoadingIndicator />
            </div>
        </div>
    )
}

const changeToHttps = (uri: string):string => {
    return 'https'+uri.slice(4);
}

export default Details;