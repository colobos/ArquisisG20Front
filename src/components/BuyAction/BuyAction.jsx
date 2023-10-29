/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState } from 'react';
import axios from 'axios';
import './BuyAction.css'
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'
import { useNavigate, useLocation } from 'react-router-dom';


function BuyAction() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: ''
  })
  const location = useLocation();
  const params_symbol = location.state.symbol;
  const params_IdLastUpdateStock = location.state.IdLastUpdateStock;
  const params_shortName = location.state.shortName;
  const [ipAddress, setIpAddress] = useState(null);
  const [dateTime, setDateTime] = useState(null);
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
      setToken(token);
      setId(id);

      const body = {
        user_id: id,
        symbol: params_symbol,
        group_id: params_IdLastUpdateStock,
        ...formData,
        shortname: params_shortName,
        ip: ipAddress,
        datetime: dateTime,
        amount: formData.amount,
        numero_grupo: "20",
      };
      console.log(body)

      const url = `${config.route}webpay/request` 
      console.log(url)
      const response = await axios.post(url, body, configaxios)
      console.log(response.data, 'response.data')
      const webpayUrl = response.data.url;
      const tokenWebpay = response.data.token;
      const purchaseData = response.data.purchaseData;

      console.log('webpayUrl', webpayUrl)
      console.log('tokenWebpay', tokenWebpay)
      console.log('purchaseData', purchaseData)



      navigate('/confirmar-compra', {
        state: { url: webpayUrl,
          token: tokenWebpay,
          amount: purchaseData.amount,
          title: params_shortName,
          type: 'Compra',
          price: purchaseData.price, 
          purchaseData: purchaseData
        },
      })

    } catch (error) {
      console.log(error, 'hay error');
    } 
  }

  const getIP = async () =>  {
    await axios.get('https://httpbin.org/ip')
      .then(response => {
        // Extract the IP address from the response data
        const ip = response.data.origin;
        setIpAddress(ip);
      })
      .catch(error => {
        console.error('Error fetching IP address:', error);
      });
  };


  useEffect(() => {
    getIP();
    setDateTime(new Date().toLocaleString());
    console.log('ipAddress:', ipAddress);
    console.log('date', dateTime);
  },[ipAddress, dateTime])

  useEffect(() => {
    // Almacenar id y token en el almacenamiento local
    if (id) {
      localStorage.setItem('cachedId', id);
    }
    if (token) {
      localStorage.setItem('cachedToken', token);
    }
  }, [id, token]);


  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
        <h4 className="validation-control">{validation}</h4>
        <h1 className="title">Comprar Acciones</h1>
        <h1 className="title">{params_symbol}</h1>
      </div>
  
      <div className="MainDivListFields">
        <form className="form" onSubmit={sentToApi}>
          <p className="labelspecific">Asigna la cantidad a comprar</p>
          <input type="text" name="amount" placeholder="Ingresa un valor" value={formData.amount} onChange={handleChange}></input>
          <div>
            <button type="submit" className='botonsubmit' onClick={sentToApi}>Comprar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyAction;





