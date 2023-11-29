/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PetitionAction.css';
import { useAuth0 } from '@auth0/auth0-react';
import config from '../../configroutes';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';

function PetitionAction() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    symbol: '', // Nuevo estado para el símbolo
    amount: ''
  });
  const location = useLocation();
  const params_auction_id = location.state.auction_id;
  const [validation, setValidation] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  const {
    user,
  } = useAuth0();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setValidation('');
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sentToApi = async (event) => {
    const proposalId = uuidv4();
    event.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };

      const stub = user.sub;
      const parts = stub.split('|');
      const id = parts[1];
      setToken(token);
      setId(id);

      const body = {
        auction_id: params_auction_id,
        proposal_id: proposalId,
        symbol: formData.symbol,
        quantity: formData.amount,
      };
      console.log(body);

      const url = `${config.route}purchase/testproposal` 
      //console.log(url);
      const response = await axios.post(url, body, configaxios);
      console.log(response.data, 'response.data');

    } catch (error) {
      console.log(error, 'hay error');
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
        <h4 className="validation-control">{validation}</h4>
        <h1 className="title">Ofertar Acciones</h1>
      </div>

      <div className="MainDivListFields">
        <form className="form" onSubmit={sentToApi}>
          <p className="labelspecific">Asigna el símbolo de la acción</p>
          <input type="text" name="symbol" placeholder="Ingresa un símbolo" value={formData.symbol} onChange={handleChange}></input>
          <p className="labelspecific">Asigna la cantidad a comprar</p>
          <input type="text" name="amount" placeholder="Ingresa una cantidad" value={formData.amount} onChange={handleChange}></input>
          <div>
            <button type="submit" className='botonsubmit'>Comprar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PetitionAction;
