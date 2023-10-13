import {useEffect, useState } from "react";
import axios from 'axios';
import "./BuyAction.css"
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'
import { useNavigate, useLocation } from 'react-router-dom';


function BuyAction() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: ""
  })
  const location = useLocation();
  const params_symbol = location.state.symbol;
  const params_IdLastUpdateStock = location.state.IdLastUpdateStock;
  const params_shortName = location.state.shortName;
  const [ipAddress, setIpAddress] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  const [validation, setValidation] = useState("");

  const {
    user,
  } = useAuth0();

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setValidation("");
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
              "Authorization": `Bearer ${token}`, 
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
          ip: ipAddress,
          datetime: dateTime
        };
        console.log(body)

        const url = `${config.route}purchase` 
        console.log(url)
        const response = await axios.post(url, body, configaxios)
        console.log(response.data, "response.data")
        if (response.data.validate === true) {
          navigate("/confirm-purchase" , { state: {
            request_id: response.data.request_id,
          } });
        }
        if (response.data.validate === false) {
          setValidation("No se pudo realizar la compra");
        }
    } catch (error) {
        console.log(error, "hay error");
    } 
  }

  const getIP = async () => {
    axios.get('https://httpbin.org/ip')
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
    console.log("ipAddress:", ipAddress);
    console.log("date", dateTime);
  },[ipAddress, dateTime])

    return (
        <div className="DivPrincipalSearch3">
          <div className="DivTitle">
          <h4 className="validation-control">{validation}</h4>
            <h1 className="title">Comprar Acciones</h1>
            <h1 className="title">{params_symbol}</h1>
          </div>
  
          <div className="MainDivListFields">
            <form className="flex flex-col gap-5 border rounded-xl shadow-[0_0px_8px_#b4b4b4] p-6 mt-5" action={data.url} method="POST">
                <input type="hidden" name="token_ws" value={data.token} />
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-bold">{data.title}</p> 
                    <p>Tipo: {data.type}</p>
                    <p>Cantidad: {data.amount}</p>
                </div>
                <button className="bg-sky-500 text-white rounded px-5 py-2" type="submit">Pagar ${data.price * data.amount}</button>
            </form>
          </div>
        </div>
      );
}

export default BuyAction;