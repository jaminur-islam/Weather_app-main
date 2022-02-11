import React, { useState } from "react";
import Link from "next/link";
import cites from "../../lib/city.list.json";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  const getInputValue = (e) => {
    const { value } = e.target;
    setQuery(value);

    const matchCities = [];

    if (value.length > 3) {
      for (const city of cites) {
        if (matchCities.length > 5) {
          console.log(matchCities.length);
          break;
        }
        const match = city.name.toLowerCase().startsWith(value);

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };
          matchCities.push(cityData);
        }
      }
    }

    return setResult(matchCities);
  };

  return (
    <div>
      <h1> Search box </h1>
      <input
        style={{
          width: "40%",
          padding: "10px",
          margin: "10px",
        }}
        onChange={getInputValue}
        type="text"
      />
      {query.length > 3 && (
        <ul className="list_style">
          {result.length > 0 ? (
            result.map((city) => (
              <li key={city.slug}>
                <Link href={`location/${city.slug}`}>
                  <a>
                    {city.name}
                    {city.state ? `, ${city.state}` : ""}
                    <span> ({city.country}) </span>
                  </a>
                </Link>
              </li>
            ))
          ) : (
            <li> No result </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
