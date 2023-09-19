import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./PlayerProfile.css";

function PlayerProfile() {


    const [fields_shown, setStocks] = useState([])

    const getInfo = async () => {
        try {

            const url = 'http://localhost:3000/purchase/perfildata'; //RUTA CORREGIR y agregar restricciones axios segun Auth0
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
            <h1 className="title">Acciones Compradas</h1>
          </div>
      
          <div className="MainDivListFields">
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">
                <p className="labelspecific">Empresa: {r.shortName}</p>
                <p className="labelspecific">Simbolo: {r.symbol}</p>
                <p className="labelspecific">Cantidad Comprada: {r.amount}</p>
                <a href={`grafico/${r.symbol}`}><button className="botonsubmit2">Ver Gráfico Precios</button></a>
              </div>
            ))}
          </div>
        </div>
      );
}

export default PlayerProfile;





