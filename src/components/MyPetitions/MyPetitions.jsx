/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './MyPetitions.css';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../../configroutes';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';

function MyPetitions() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: '', // Nuevo estado para el símbolo
    amount: ''
  });
  const location = useLocation();
  const params_auction_id = location.state.auction_id;
  const params_stock_id = location.state.stock_id;
  const [fields_shown, setStocks] = useState([])
  const [validation, setValidation] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

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
          'Authorization': `Bearer ${token}`, 
        }
      };
        
      const url = `${config.route}purchase/revisar_propuestas/${params_auction_id}`; 
      const response = await axios.get(url, configaxios)
      setStocks(response.data)

    } catch (error) {
      console.log(error, 'hay error');
    }
  }

  useEffect(() => {
    getInfo()
  },[])

  const handleAccept = async (groupId, proposal_id, quantity) => {
    try {
      const token = await getAccessTokenSilently();
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };

      const body = {
        auction_id: params_auction_id,
        proposal_id: proposal_id,
        stock_id: params_stock_id,
        quantity:  quantity,
        group_id: "20",
        type: "acceptance"
      };

      const url = `${config.route}purchase/aceptar_rechazar`; // Endpoint para aceptar la propuesta
      const response = await axios.post(url, body);
      getInfo();
    } catch (error) {
      console.log(error, 'hay error');
    }
  };

  const handleReject = async (groupId, proposal_id, quantity) => {
    try {
      const token = await getAccessTokenSilently();
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };

      const body = {
        auction_id: params_auction_id,
        proposal_id: proposal_id,
        stock_id: params_stock_id,
        quantity:  quantity,
        group_id: "20",
        type: "rejection"
      };

      const url = `${config.route}purchase/aceptar_rechazar/`; // Endpoint para rechazar la propuesta
      const response = await axios.post(url, body);
      getInfo();
    } catch (error) {
      console.log(error, 'hay error');
    }
  };
  

  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
        <h4 className="validation-control">{validation}</h4>
        <h1 className="title">Ver Ofertas</h1>
        <h2 className="title">Auction Id: {params_auction_id}</h2>
        <h2 className="title">Acción: {params_stock_id}</h2>
      </div>

      <div className="MainDivListFields">
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">
                    <p className="labelspecific">Acción Ofrecida: {r.stock_id}</p>
                    <p className="labelspecific">Cantidad Ofrecida: {r.quantity}</p>
                    <p className="labelspecific">Grupo: {r.group_id}</p>
                    <div>
                      <button className='botonsubmit2' onClick={() => handleAccept(r.group_id, r.proposal_id, r.quantity)}>Aceptar</button>
                      <button className='botonsubmit2' onClick={() => handleReject(r.group_id, r.proposal_id, r.quantity)}>Rechazar</button>
                    </div>
              </div>
              
            ))}
      </div>
    </div>
  );
}

export default MyPetitions;
