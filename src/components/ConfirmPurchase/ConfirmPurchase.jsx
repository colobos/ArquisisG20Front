import React from 'react';
import { useLocation } from 'react-router-dom';
import "./ConfirmPurchase.css"

function ConfirmPurchase() {
  const location = useLocation();
  const data = location.state;
  
  console.log('Data in component:', data)
  return (
    <div className="DivPrincipalSearch3">
      <div className="DivTitle">
            <h1 className="title">Confirmar compra</h1>
      </div>
      <form  action={data.url} method="POST">
        <input type="hidden" name="token_ws" value={data.token} />
        <div >
          <p className="labelspecific">{data.title}</p>
          <p className="labelspecific">Tipo: {data.type}</p>
        </div>
        <button className='botonsubmit'>Pagar ${data.price}</button>
      </form>
    </div>
  );
}

export default ConfirmPurchase;
