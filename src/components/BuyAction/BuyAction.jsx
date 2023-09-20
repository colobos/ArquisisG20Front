import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./BuyAction.css";
import { useAuth0 } from "@auth0/auth0-react"; 

function BuyAction() {

  const { getAccessTokenSilently } = useAuth0();
  
  const getInfo = async () => {
    try {
      const token = await getAccessTokenSilently(); 
      console.log("Token del usuario:", token);

      const configaxios = {
          headers: {
              "Authorization": `${token}`, 
          }
      };

      const url = `url_comprar`; 
      console.log(url);
      const response = await axios.post(url, configaxios);
      console.log(response);

    } catch (error) {
      console.log(error, "hay error");
    }
  }

  useEffect(() => {
    getInfo();
  }, []); 

  return (
    <div className="DivPrincipalSearch">

    </div>
  );
}

export default BuyAction;





