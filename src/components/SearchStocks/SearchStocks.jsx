import React, {useEffect, useState } from "react";
import axios from 'axios';
import "./SearchField.css"


function SearchStocks() {

    const [fields_shown, setStocks] = useState([])

    const getInfo = async () => {
        try {

            const url = 'http://localhost:3000/stocks'; //RUTA CORREGIR
            console.log(url)
            const response = await axios.get(url)
            console.log(response)
            setStocks(response.data)
        } catch (error) {
            console.log(error, "hay error");
        }
    }

    useEffect(() => {
        getInfo()
    },[])

    return (
        <div className="DivPrincipalSearch">
          <div className="DivTitle">
            <h1 className="title">Empresas Disponibles</h1>
          </div>
      
          <div className="MainDivListFields">
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">
                <p className="labelspecific">Empresa: {r.shortName}</p>
                <p className="labelspecific">Simbolo: {r.symbol}</p>
                <p className="labelspecific">Ultimo precio: {r.price}</p>
                <a href={`empresas/${r.symbol}`}><button className="botonsubmit2">Ver Detalles</button></a>
              </div>
            ))}
          </div>
        </div>
      );
}

export default SearchStocks;
