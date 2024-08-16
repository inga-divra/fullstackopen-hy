import { useState } from "react";
import Weather from "./Weather";

const Country = ({ countriesToShow, searchedItem }) => {
    const [selectedCountry, setSelectedCountry] = useState(null)

    if (selectedCountry) {
        const { name: { common: name }, capital, population, languages, flags } = selectedCountry
        return (
            <>
                <div className='country_container'>
                    <div className='country_info'>
                        <h2>{name}</h2>
                        <p >Capital: {capital}</p>
                        <p >Population: {population}</p>
                        <h3>Languages:</h3>
                        <ul>
                            {Object.values(languages).map((language, index) => {
                                return <li key={`${language}-${index}`}>{language}</li>;
                            })}
                        </ul>
                        <img src={flags.png} alt={name} className='country_flag' />
                    </div>
                    <div className='country_weather'>
                        <Weather capital={capital[0]} />
                    </div>
                </div>
                <div>
                    <button onClick={() => setSelectedCountry(null)} className='country_back_btn'>Back to the list</button>
                </div>
            </>
        );
    }

    if (searchedItem === '') {
        return <h2 className='country_msg'>Start typing to search for countries</h2>
    }

    if (searchedItem.length > 0 && countriesToShow.length > 10) {
        return <h2 className='country_msg'>Too many matches, specify another filter</h2>
    }

    if (searchedItem.length > 0 && countriesToShow.length > 1) {
        return <div>
            <h2 className='country_msg'>Matching countries</h2>
            <ul className='country_list'>
                {countriesToShow.map((country) => {
                    const index = country.cca3;
                    const name = country.name.common
                    return <li className='country_list_item' key={index}>
                        {name}
                        <button
                            className='country_list_btn button-89'
                            type='button'
                            onClick={() => setSelectedCountry(country)}
                        >
                            show
                        </button>
                    </li>
                })}
            </ul>
        </div>
    }

    if (searchedItem.length > 0 && countriesToShow.length === 1) {
        const { name: { common: name }, capital, population, languages, flags } = countriesToShow[0];
        return (
            <>
                <div className='country_container'>
                    <div className='country_info'>
                        <h2>{name}</h2>
                        <p>Capital: {capital}</p>
                        <p>Population: {population}</p>
                        <h3>Languages:</h3>
                        <ul>
                            {Object.values(languages).map((language, index) => (
                                <li key={`${language}-${index}`}>{language}</li>
                            ))}
                        </ul>
                        <img src={flags.png} alt={name} className='country_flag' />
                    </div>
                    <div className='country_weather'>
                        <Weather capital={capital[0]} />
                    </div>
                </div>
            </>
        );
    }

    return <h2 className='country_not_found'>No matches found</h2>
};

export default Country;
