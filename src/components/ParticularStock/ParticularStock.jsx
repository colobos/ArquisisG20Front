import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./ParticularField.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ParticularStock() {
  const params = useParams();
  const event_symbol = params.symbol;
  const [fields_shown, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [userPageInput, setUserPageInput] = useState(currentPage);
  const [ShortName, setShortName] = useState("");
  const navigate = useNavigate();


  const myfields = () => {
    navigate("/empresas_disponibles")
  }

  const wantToBuy = () => {
    navigate("/comprar") //HACER
  }

  const getInfo = async () => {
    try {
      const url = `http://localhost:3000/stocks/${event_symbol}?page=${userPageInput}&size=${pageSize}`; //RUTA CORREGIR
      console.log(url);
      const response = await axios.get(url);
      console.log(response);
      setStocks(response.data);
      setShortName(response.data[0].shortName)
    } catch (error) {
      console.log(error, "hay error");
    }
  }

  useEffect(() => {
    getInfo();
  }, [userPageInput, pageSize]); 

  const handlePageInputChange = (event) => {
    const newPage = parseInt(event.target.value, 10);
    if (!isNaN(newPage)) {
      setUserPageInput(newPage);
    }
  }

  const handlePageInputBlur = () => {
    setCurrentPage(userPageInput);
  }

  return (
    <div className="DivPrincipalSearch">
      <div className="DivTitle">
        <h1 className="title">Detalle Historico: {ShortName}</h1>
      </div>

      <div className="DivTitleBack">
                <button type="" className='botonsubmit' onClick={wantToBuy}>Comprar Acciones</button>
        </div>

      <div className="pageInput">
        <label htmlFor="pageInput">Número de Página: </label>
        <input
          type="number"
          id="pageInput"
          value={userPageInput}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlur}
        />
      </div>

      <div className="pageSizeInput">
        <label htmlFor="pageSize">Tamaño de la Página: </label>
        <input
          type="number"
          id="pageSize"
          value={pageSize}
          onChange={(event) => setPageSize(event.target.value)}
        />
      </div>

      <div className="MainDivListFields2">
        {fields_shown.map(r => (
          <div key={r.id} className="labelfield2">
            <p className="labelspecific">Empresa: {r.shortName}</p>
            <p className="labelspecific">Simbolo: {r.symbol}</p>
            <p className="labelspecific">Precio: {r.price}</p>
            <p className="labelspecific">Moneda: {r.currency}</p>
            <p className="labelspecific">Proveedor: {r.source}</p>
            <p className="labelspecific">Fecha: {r.DateTimeLastUpdateStock}</p>
          </div>
        ))}
      </div>
      <div className="DivTitleBack">
                <button type="" className='botonsubmit2' onClick={myfields}>Volver</button>
        </div>
    </div>
  );
}

export default ParticularStock;





