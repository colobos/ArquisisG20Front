import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { handleFetch } from '../../api/fetchHandler';
import config from '../../configroutes'
import { useAuth0 } from '@auth0/auth0-react'; 
import axios from 'axios';

function PurchaseCompleted() {
  const { getAccessTokenSilently } = useAuth0();
  const [searchParams] = useSearchParams();
  const { user } = useAuth0();

  const lookForValidation = async () => {
    const webpayToken = searchParams.get('token_ws');
    let userInfo = null;
    let retries = 0;
    const MAX_RETRIES = 5;

    while (!userInfo && retries < MAX_RETRIES) {
      userInfo = await getUserInfo();
      retries++;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Espera 1 segundo antes del siguiente intento
    }

    if (webpayToken) {
      console.log('webpay token:', webpayToken);
      const token = await getAccessTokenSilently(); 
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
        if (backendResponse.data.validation === true) {
          console.log('success!!');
        }
      } catch (error) {
        console.error('Error during validation POST:', error);
      }
    } else {
      console.log('no webpay token');
      const token = await getAccessTokenSilently(); 
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
      const stub = userInfo ? userInfo.sub : null;
      const parts = stub ? stub.split('|') : [];
      const id = parts.length > 1 ? parts[1] : null;
      const url = `${config.route}webpay/validation`;
      console.log('id:', id);
      const body = {
        token: '',
        user_id: id,
      };
      try {
        const backendResponse = await axios.post(url, body, configaxios);
        console.log('backend response:', backendResponse);
      } catch (error) {
        console.error('Error during validation POST:', error);
      }
    }
  }

  const getUserInfo = async () => {
    try {
      const { getAccessTokenSilently } = useAuth0();
      const token = await getAccessTokenSilently();
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };
      const userInfo = await axios.get('URL_PARA_OBTENER_INFO_DEL_USUARIO', configaxios);
      return userInfo.data;
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      return null;
    }
  };

  useEffect(() => {
    lookForValidation(); // Llama a la función una vez después de la renderización inicial
  }, []);

  return (
    <div>
      <h1></h1>
      <p>por cambiar....</p>
      <Link to="/">
        Volver a inicio
      </Link>
    </div>
  );
}

export default PurchaseCompleted;
