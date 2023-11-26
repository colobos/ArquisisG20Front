/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Subasta.css';
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'

function Subasta() {
  const { getAccessTokenSilently } = useAuth0();
  const [fields_shown, setStocks] = useState([])
  const [formData, setFormData] = useState({
    quantity: ''
  })
  const [validation, setValidation] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');

  const {
    user,
  } = useAuth0();

  const [isAdmin, setIsAdmin] = useState(true)
  const checkAdmin = async () => {
    const token = await getAccessTokenSilently();
    console.log('Token del usuario:', token);
    const decodedAccessToken = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded Access Token:', decodedAccessToken);
    if (decodedAccessToken['permissions'][0] === 'admin:uses') {
      setIsAdmin(true);
      console.log('Es admin!!')
    }
    else {
        setIsAdmin(true);
        console.log('No es admin!!');
    }
  };
  checkAdmin();

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

      const stub = user.sub;
      const parts = stub.split('|'); 
      const id = parts[1]; 
      setToken(token);
      setId(id);

      const body = {
        // stock_id: params_IdLastUpdateStock, //Ajustar según ruta real
        ...formData,
        quantity: formData.quantity,
        group_id: "20",
        type: "offer"
      };

      console.log(body)

      //const url = `${config.route}webpay/request` 
      console.log(url)
      // const response = await axios.post(url, body, configaxios) //Ajustar según ruta real

    } catch (error) {
      console.log(error, 'hay error');
    } 
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
        <h1 className="title">Subasta</h1>
      </div>
      
      <div className="MainDivListFields">
      {isAdmin ? (
          <div className="MainDivListFields">
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">

                <form className="form" onSubmit={sentToApi}>
                    <p className="labelspecific">Empresa: {r.shortName}</p>
                    <p className="labelspecific">Simbolo: {r.symbol}</p>
                    <p className="labelspecific">Cantidad Comprada: {r.amount}</p>
                    <input type="text" name="quantity" placeholder="Ingresa una cantidad a subastar" value={formData.quantity} onChange={handleChange}></input>
                    <div>
                        <button type="submit" className='botonsubmit' onClick={sentToApi}>Realizar Subasta</button>
                    </div>
                </form>
              </div>
              
            ))}
          </div>
        ) : (
          <p>Usuario no tiene permiso para subastar/intercambiar acciones.</p>
        )}
      </div>
    </div>
  );
}

export default Subasta;
//<a href={`grafico/${r.symbol}`}><button className="botonsubmit2">Ver Gráfico Precios</button></a>