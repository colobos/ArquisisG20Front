import React, { useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { handleFetch } from '../../api/fetchHandler';
import config from '../../configroutes'
import { useAuth0 } from '@auth0/auth0-react'; 
import axios from 'axios';

function PurchaseCompleted() {
  const { loginWithRedirect } = useAuth0();
  const [searchParams] = useSearchParams();
  const cachedId = localStorage.getItem('cachedId');
  const cachedToken = localStorage.getItem('cachedToken');
  const [response_show, setShowResponse] = useState([])

  const lookForValidation = async () => {
    const webpayToken = searchParams.get('token_ws');

    if (webpayToken) {
      console.log('webpay token:', webpayToken);
      const token = cachedToken
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
      const url = `${config.route}webpay/validation`;
      const body = {
        token: webpayToken,
      };
      try {
        const backendResponse = await axios.post(url, body, configaxios);
        console.log('backend response:', backendResponse);
        setShowResponse(backendResponse.data.message);
        if (backendResponse.data.validation === true) {
          console.log('success!!');
        }
      } catch (error) {
        console.error('Error during validation POST:', error);
      }
    } else {
      console.log('no webpay token');
      const token = cachedToken
      const url = `${config.route}webpay/validation`;
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
      const body = {
        token: '',
        user_id: cachedId,
      };
      try {
        const backendResponse = await axios.post(url, body, configaxios);
        console.log('backend response:', backendResponse);
        setShowResponse(backendResponse.data.message);
      } catch (error) {
        console.error('Error during validation POST:', error);
      }
    } 
  }

  const reedireccion = async (event) => {
    loginWithRedirect();
  }

  useEffect(() => {
    console.log('Cached ID:', cachedId);
    console.log('Cached Token:', cachedToken);
    lookForValidation(); // Llama a la función una vez después de la renderización inicial
  }, []);

  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
            <h1 className="title">Respuesta:</h1>
      </div>
      <h3 className="title">{response_show}:</h3>
      <div>
            <button type="submit" className='botonsubmit' onClick={reedireccion}>Reedirigir a Menú Principal</button>
      </div>
    </div>
  );
}

export default PurchaseCompleted;
