import React, {useEffect, useState } from "react";
import axios from 'axios';
import "./SearchField.css"
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'


function SearchStocks() {
    const { getAccessTokenSilently } = useAuth0();
    const [fields_shown, setStocks] = useState([])

    const {
      user,
      isAuthenticated,
      loginWithRedirect,
      logout,
    } = useAuth0();

    const getInfo = async () => {
        try {
            const token = await getAccessTokenSilently(); 
            console.log("Token del usuario:", token);
    
            const configaxios = {
                headers: {
                    "Authorization": `${token}`, 
                }
            };
    
            const url = `${config.route}stocks`; 
            console.log(url);
            const response = await axios.get(url, configaxios);
            console.log(response);
            setStocks(response.data);
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
