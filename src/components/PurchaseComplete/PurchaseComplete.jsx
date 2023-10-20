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

  const lookForValidation = async () => {
    const webpayToken = searchParams.get('token_ws');
    if (webpayToken) {
      console.log('webpay token:', webpayToken)
      const token = await getAccessTokenSilently(); 
      const configaxios = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        }
      };
      const url = `${config.route}webpay/validation`
      const body = {
        token: webpayToken,
      };
      try {
        const backendResponse = await axios.post(url, body, configaxios);
        console.log('backend response:', backendResponse);
        if (backendResponse.data.validation === 'success') {
          console.log('success!!');
        }
      } catch (error) {
        console.error('Error during validation POST:', error);
      }
    } else {
      console.log('no webpay token');
    }
  }

  useEffect(() => {
    lookForValidation(); // Call the function once after the initial render
  }, []); 

  // if (isLoading) {
  //   return (
  //     <div className="p-20">
  //       <h1>Loading...</h1>
  //     </div>
  //   );
  // }


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
