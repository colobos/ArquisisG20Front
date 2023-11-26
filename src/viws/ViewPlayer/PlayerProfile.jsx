/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PlayerProfile.css';
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'
import jsPDF from 'jspdf';

function PlayerProfile() {
  const { getAccessTokenSilently } = useAuth0();
  const [fields_shown, setStocks] = useState([])

  const {
    user,
  } = useAuth0();

  const generatePDF = (user_id, symbol, shortName, amount, group_id, datetime, country, city) => {
    const doc = new jsPDF();

    // Agrega contenido al PDF
    doc.text('Boleta de compra', 10, 10);
    doc.text('Número de Grupo: 20', 10, 20);
    doc.text(`Cliente ID: ${user_id}`, 10, 30);
    doc.text(`Fecha y hora: ${datetime}`, 10, 40);
    doc.text(`Stock Comprada: ${shortName}`, 10, 50);
    doc.text(`Símbolo: ${symbol}`, 10, 60);
    doc.text(`Cantidad Comprada: ${amount}`, 10, 70);
    doc.text(`Ubicación de la Compra: ${country}, ${city}`, 10, 80);
    doc.save('boleta.pdf');
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
        
      const url = `${config.route}purchase/perfildata/${id}`; 
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
        <h1 className="title">Acciones Compradas</h1>
      </div>
      
      <div className="MainDivListFields">
        {fields_shown.map(r => (
          <div key={r.id} className="labelfield">
            <p className="labelspecific">Empresa: {r.shortName}</p>
            <p className="labelspecific">Simbolo: {r.symbol}</p>
            <p className="labelspecific">Cantidad Comprada: {r.amount}</p>
            <button className='botonsubmit' onClick={()=>generatePDF(r.user_id, r.symbol, r.shortName, r.amount, r.group_id, r.datetime, r.country, r.city)}>Descargar Boleta</button>
            <p className="labelspace"></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayerProfile;
//<a href={`grafico/${r.symbol}`}><button className="botonsubmit2">Ver Gráfico Precios</button></a>