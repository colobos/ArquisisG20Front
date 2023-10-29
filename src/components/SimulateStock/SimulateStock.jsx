/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState } from 'react';
import axios from 'axios';
import './SimulateStock.css'
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'
import { useNavigate, useLocation } from 'react-router-dom';


function SimulateStock() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    time: ''
  })
  const location = useLocation();
  const params_symbol = location.state.symbol;
  const params_IdLastUpdateStock = location.state.IdLastUpdateStock;
  const params_shortName = location.state.shortName;
  const [validation, setValidation] = useState('');

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
    event.preventDefault()
    try {
      const token = await getAccessTokenSilently(); 
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };

      console.log(params_symbol);
      const stub = user.sub;
      const parts = stub.split('|'); 
      const id = parts[1]; 

      const body = {
        user_id: id,
        symbol: params_symbol,
        group_id: params_IdLastUpdateStock,
        ...formData,
        shortname: params_shortName,
        amount: formData.amount,
        time: formData.time,
      };

      const url = `${config.route}backurlpredicction` //RUTA PREDICCION
      console.log(url)
      /*const response = await axios.post(url, body, configaxios) TO DO
      console.log(response.data, 'response.data')
      */

      if (formData.amount && formData.time) {
        navigate("/predicciones_realizadas");
      }
      setValidation("No se puede dejar vacío algún campo");
      

    } catch (error) {
      console.log(error, 'hay error');
    } 
  }


  useEffect(() => {
  },[])

  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
        <h4 className="validation-control">{validation}</h4>
        <h1 className="title">Simular Predicción Acciones</h1>
        <h1 className="title">{params_symbol}</h1>
      </div>
  
      <div className="MainDivListFields">
        <form className="form" onSubmit={sentToApi}>
          
          <p className="labelspecific">Asigna la cantidad a comprar</p>
          <input type="text" name="amount" placeholder="Ingresa un valor" value={formData.amount} onChange={handleChange}></input>
          
          <p className="labelspecific">Asigna el tiempo a ahorrar</p>
          <input type="text" name="time" placeholder="Ingresa un valor" value={formData.time} onChange={handleChange}></input>
          <div>
            <button type="submit" className='botonsubmit' onClick={sentToApi}>Simular</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SimulateStock;





