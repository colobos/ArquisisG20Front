import { useEffect, useState } from "react";
import axios from 'axios';
import "./PlayerProfile.css";
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'

function PlayerProfile() {
    const { getAccessTokenSilently } = useAuth0();
    const [fields_shown, setStocks] = useState([])


    const {
      user,
    } = useAuth0();


    const getInfo = async () => {
        try {
            const token = await getAccessTokenSilently(); 

            const stub = user.sub;
            const parts = stub.split('|'); 
            const id = parts[1]; 

            const configaxios = {
                headers: {
                    "Authorization": `${token}`, 
                }
            };
        
            const url = `${config.route}purchase/perfildata/${id}`; 
            console.log(url)
            const response = await axios.get(url, configaxios)
            console.log(response)
            setStocks(response.data)
        } catch (error) {
            console.log(error, "hay error");
        }
    }

    useEffect(() => {
        getInfo()
    })

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
                <p className="labelspace"></p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default PlayerProfile;
//<a href={`grafico/${r.symbol}`}><button className="botonsubmit2">Ver Gráfico Precios</button></a>





