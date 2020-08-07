import React from "react";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <div className="tr" key={Math.random()}>
          <div className="td">
              <img src={country.countryInfo.flag} alt="table-flags" className="table-flags"/> 
              <strong><span>{country.country} </span></strong>
          </div>
          <div className="td">
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Table;