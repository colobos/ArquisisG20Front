/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerProfile.css';
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'
import { useNavigate, useLocation } from 'react-router-dom';

function PredictionPlayer() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [fields_shown, setStocks] = useState([])
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); 

  const {
    user,
  } = useAuth0();

  const myfields = (id, symbol, shortname, prediction_value, precios, dates) => {
    navigate("/prediccion", {
      state: {
        id,
        symbol,
        shortname,
        prediction_value,
        precios,
        dates,
      }
    })
  }

  const getInfo = async () => {
    try {
      const token = await getAccessTokenSilently(); 

      const stub = user.sub;
      const parts = stub.split('|'); 
      const id = parts[1]; 

      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
      
      const url = `${config.route}prediction/${id}`; //TO DO ROUTRE 7777 //RUTA PREDICCION
      console.log(url)
      const response = await axios.get(url, configaxios)
      console.log(response)
      setStocks(response.data)
    } catch (error) {
      console.log(error, 'hay error');
    }
  }

  useEffect(() => {
    getInfo()
  },[])

  return (
    <div className="DivPrincipalSearch">
      <div className="DivTitle">
        <h1 className="title">Predicciones Realizadas</h1>
      </div>
      
      <div className="MainDivListFields">
        {fields_shown.map(r => (
          <div key={r.id} className="labelfield">
            <p className="labelspecific">Empresa: {r.shortname}</p>
            <p className="labelspecific">Simbolo: {r.symbol}</p>
            <p className="labelspecific">Cantidad Comprada: {r.amount}</p>
            <p className="labelspecific">Tiempo Simulado: {r.time}</p>
            <p className="labelspecific">Id Predicción: {r.id}</p>

            {r.state && ( // Mostrar el botón solo si r.state es true
            <div>
              <p className="labelspecific">Estado: Listo</p>
              <button
                className='botonsubmit2'
                onClick={() => myfields(r.id, r.symbol, r.shortname, r.prediction_value, r.precios, r.dates)}
                disabled={isButtonDisabled} 
              >
                Ver Predicción
              </button>
            </div>
            )}
            {!r.state && <p className="labelspecific">Estado: En proceso</p>}
              <p className="labelspace"></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredictionPlayer;
//<a href={`grafico/${r.symbol}`}><button className="botonsubmit2">Ver Gráfico Precios</button></a>





