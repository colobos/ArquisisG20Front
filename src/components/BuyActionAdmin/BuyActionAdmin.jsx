import {useEffect, useState } from "react";
import axios from 'axios';
import "./BuyActionAdmin.css"
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'
import { useNavigate } from 'react-router-dom';


function BuyActionAdmin() {
    const { getAccessTokenSilently } = useAuth0();
    const [fields_shown, setStocks] = useState([])
    const navigate = useNavigate();

    //const isAdmin = false; // Obtener Admin. En este caso no es usuario Admin
    const [isAdmin, setIsAdmin] = useState(true)
    const checkAdmin = async () => {
      const token = await getAccessTokenSilently();
      console.log('Token del usuario:', token);
      const decodedAccessToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Access Token:', decodedAccessToken);
      if (decodedAccessToken['permissions'][0] === 'admin:uses') {
        setIsAdmin(true);
        console.log('Es admin!!')
      }
      else {
          setIsAdmin(true);
          console.log('No es admin!!');
      }
    };
    checkAdmin();
    
    const myfields = (symbol, IdLastUpdateStock, shortName) => {
      navigate("/empresas", {
        state: {
          symbol,
          IdLastUpdateStock,
          shortName,
        }
      })
    }

    const getInfo = async () => {
        try {
            const token = await getAccessTokenSilently(); 
            console.log("Token del usuario:", token);
    
            const configaxios = {
                headers: {
                    "Authorization": `Bearer ${token}`, 
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
  
        {isAdmin ? (
          <div className="MainDivListFields">
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">
                <p className="labelspecific">Empresa: {r.shortName}</p>
                <p className="labelspecific">Simbolo: {r.symbol}</p>
                <p className="labelspecific">Ultimo precio: {r.price}</p>
                <button className='botonsubmit2' onClick={()=>myfields(r.symbol, r.IdLastUpdateStock, r.shortName)}>Ver Detalles</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Usuario no tiene permiso para comprar acciones.</p>
        )}
      </div>
    );
}

export default BuyActionAdmin;
//<a href={`empresas/${r.symbol}`}><button className="botonsubmit2">Ver Detalles</button></a>
