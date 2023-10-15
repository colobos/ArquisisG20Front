import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmPurchase() {
  const location = useLocation();
  const data = location.state;

  return (
    <div >
      <p >Confirmar compra</p>
      <form  action={data.url} method="POST">
        <input type="hidden" name="token_ws" value={data.token} />
        <div >
          <p >{data.title}</p>
          <p>Tipo: {data.type}</p>
          <p>Cantidad: {data.amount}</p>
        </div>
        <button>Pagar ${data.price * data.amount}</button>
      </form>
    </div>
  );
}

export default ConfirmPurchase;
