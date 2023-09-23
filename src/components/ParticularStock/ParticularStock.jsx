import { useEffect, useState } from "react";
import axios from 'axios';
import "./ParticularField.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'

function ParticularStock() {
  const [fields_shown, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 
  const [userPageInput, setUserPageInput] = useState(currentPage);
  const [ShortName, setShortName] = useState("");
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  
  const params_symbol = location.state.symbol;
  const params_IdLastUpdateStock = location.state.IdLastUpdateStock;
  const params_shortName = location.state.shortName;


  const wantToBuy = (symbol, IdLastUpdateStock, shortName) => {
    navigate("/comprar", {
      state: {
        symbol,
        IdLastUpdateStock,
        shortName,
      }
    })
  }

  const myfields = () => {
    navigate("/empresas_disponibles")
  }

  const getInfo = async () => {
    try {
      const token = await getAccessTokenSilently(); 
      console.log("Token del usuario:", token);

      const configaxios = {
          headers: {
              "Authorization": `${token}`, 
          }
      };
      console.log("VAR");
      console.log(params_symbol);
      const url = `${config.route}stocks/${params_symbol}?page=${userPageInput}&size=${pageSize}`; 
      console.log(url);
      const response = await axios.get(url, configaxios);
      console.log(response);
      setStocks(response.data);
      setShortName(response.data[0].shortName)
    } catch (error) {
      console.log(error, "hay error");
    }
  }

  useEffect(() => {
    getInfo();
  }, []); 

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
                <button type="" className='botonsubmit' onClick={()=>wantToBuy(params_symbol, params_IdLastUpdateStock, params_shortName)}>Comprar Acciones</button>
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





