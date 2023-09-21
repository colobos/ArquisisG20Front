import React, {useEffect, useState } from "react";
import axios from 'axios';
import "./BuyAction.css"
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


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

  const {
    user,
  } = useAuth0();


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value)
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};
    
    const myfields = (params) => {
      navigate("/empresas", {
        state: {
          params
        }
      })
    }

    const sentToApi = async (event) => {
      event.preventDefault()
      try {
        const token = await getAccessTokenSilently(); 
          const configaxios = {
              headers: {
                "Authorization": `${token}`, 
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
            shortName: params_shortName,
          };
          console.log(body)

          const url = `${config.route}/ruta` //TODO:
          console.log(url)
          const response = await axios.post(url, body, configaxios)
          console.log(response.data, "response.data")
          //navigate("/perfil_empresa"); // Ir al inicio
      } catch (error) {
          console.log(error, "hay error");
      } 
      
  }

    useEffect(() => {
    },[])

    return (
        <div className="DivPrincipalSearch3">
          <div className="DivTitle">
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





