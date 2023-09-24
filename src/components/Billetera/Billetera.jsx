import {useEffect, useState } from "react";
import axios from 'axios';
import "./Billetera.css"
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'


function Billetera() {
    const { getAccessTokenSilently } = useAuth0();
    const [formData, setFormData] = useState({
      money: ""
  })

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
    
    const sentToApi = async (event) => {
      event.preventDefault()
      try {
        const token = await getAccessTokenSilently(); 
          const configaxios = {
              headers: {
                "Authorization": `${token}`, 
              }
          };

          const stub = user.sub;
          const parts = stub.split('|'); 
          const id = parts[1]; 
          const body = {
            user_id: id,
            ...formData 
          };
          const url = `${config.route}wallet/${id}`
          console.log(url)
          const response = await axios.patch(url, body, configaxios)
          console.log(response.data, "response.data")
          //navigate("/"); // Ir al inicio
      } catch (error) {
          console.log(error, "hay error");
      } 
      
  }

    useEffect(() => {
    })

    return (
        <div className="DivPrincipalSearch3">
          <div className="DivTitle">
            <h1 className="title">Cargar Billetera</h1>
          </div>
  
          <div className="MainDivListFields">
          <form className="form" onSubmit={sentToApi}>
            <p className="labelspecific">Asigna tu dinero para cargar</p>
            <input type="text" name="money" placeholder="Ingresa un valor" value={formData.money} onChange={handleChange}></input>
            <div>
              <button type="submit" className='botonsubmit' onClick={sentToApi}>Enviar Carga</button>
            </div>
            </form>
          </div>
        </div>
      );
}

export default Billetera;
//<a href={`empresas/${r.symbol}`}><button className="botonsubmit2">Ver Detalles</button></a>
