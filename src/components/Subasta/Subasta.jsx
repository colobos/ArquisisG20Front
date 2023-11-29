/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Subasta.css';
import { useAuth0 } from '@auth0/auth0-react'; 
import config from '../../configroutes'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Subasta() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [fields_shown, setStocks] = useState([])
  const [fields_shown_ofertas, setStocksOferta] = useState([])
  const [fields_shown_mis_ofertas, setStocksMisOferta] = useState([])
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
        setIsAdmin(false);
        console.log('No es admin!!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setValidation('');
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const sentToApi = async (event, symbol) => {
    event.preventDefault()
    const auctionId = uuidv4();
    console.log(auctionId)
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
        auction_id: auctionId,
        symbol: symbol,
        quantity: formData.quantity,
        group_id: "20",
        type: "offer"
      };

      console.log(body)

      const url = `${config.route}purchase/test`
      console.log(url)
      const response = await axios.post(url, body, configaxios) //Ajustar según ruta real

    } catch (error) {
      console.log(error, 'hay error');
    } 
  }

  const myfields = (stock_id, auction_id, quantity, group_id) => {
    navigate("/peticiones", {
      state: {
        stock_id,
        auction_id,
        quantity,
        group_id,
      }
    })
  }

  const myfields2 = (stock_id, auction_id, quantity, group_id) => {
    navigate("/peticiones_ofertas_mias", {
      state: {
        stock_id,
        auction_id,
        quantity,
        group_id,
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
        
      const url = `${config.route}purchase/perfildata/${id}`; 
      console.log(url)
      const response = await axios.get(url, configaxios)
      console.log(response)
      setStocks(response.data)

      const url2 = `${config.route}purchase/ventas_grupos`; 
      console.log(url2)
      const response2 = await axios.get(url2, configaxios)
      setStocksOferta(response2.data)

      const url3 = `${config.route}purchase/mis_ventas_grupos`; 
      console.log(url2)
      const response3 = await axios.get(url3, configaxios)
      setStocksMisOferta(response3.data)

    } catch (error) {
      console.log(error, 'hay error');
    }
  }

  useEffect(() => {
    getInfo()
    checkAdmin()
  },[])

  return (
    <div className="DivPrincipalSearch">
      <div className="DivTitle">
        <h1 className="title">Subasta</h1>
      </div>
      
      <div className="MainDivListFields">
      {isAdmin ? (
          <div className="MainDivListFields">
            <h2 className="title">Ofrecer a la Venta</h2>
            {fields_shown.map(r => (
              <div key={r.id} className="labelfield">

                <form className="form" onSubmit={sentToApi}>
                    <p className="labelspecific">Empresa: {r.shortName}</p>
                    <p className="labelspecific">Simbolo: {r.symbol}</p>
                    <p className="labelspecific">Cantidad Comprada: {r.amount}</p>
                    <input type="text" name="quantity" placeholder="Ingresa una cantidad a subastar" value={formData.quantity} onChange={handleChange}></input>
                    <div>
                        <button type="submit" className='botonsubmit' onClick={(event) => sentToApi(event, r.symbol)}>Realizar Subasta</button>
                    </div>
                </form>
              </div>
              
            ))}

            <h2 className="title">Venta de otros grupos</h2>
            {fields_shown_ofertas.map(r => (
              <div key={r.id} className="labelfield">

                <form className="form" onSubmit={sentToApi}>
                    <p className="labelspecific">Empresa: {r.stock_id}</p>
                    <p className="labelspecific">Cantidad: {r.quantity}</p>
                    <p className="labelspecific">Grupo: {r.group_id}</p>
                    <button className='botonsubmit2' onClick={()=>myfields(r.stock_id, r.auction_id, r.quantity, r.group_id)}>Realizar Petición</button>
                </form>
              </div>
              
            ))}


          <h2 className="title">Ver mis Ofertas</h2>
            {fields_shown_mis_ofertas.map(r => (
              <div key={r.id} className="labelfield">

                <form className="form" onSubmit={sentToApi}>
                    <p className="labelspecific">Auction Id: {r.auction_id}</p>
                    <p className="labelspecific">Empresa: {r.stock_id}</p>
                    <p className="labelspecific">Cantidad Ofrecida: {r.quantity}</p>
                    <button className='botonsubmit2' onClick={()=>myfields2(r.stock_id, r.auction_id, r.quantity, r.group_id)}>Ver propuestas</button>
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