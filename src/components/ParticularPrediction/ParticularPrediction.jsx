import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import "./ParticularPrediction.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react"; 
import config from '../../configroutes'
import * as d3 from 'd3';

function ParticularPrediction() {
  const [fields_shown, setStocks] = useState([]);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const chartRef = useRef();
  
  const params_symbol = location.state.symbol;
  const params_shortName = location.state.shortName;


  const myfields = () => {
    navigate("/predicciones_realizadas")
  }

  const getInfo = async () => {
    try {
      const token = await getAccessTokenSilently(); 
      console.log("Token del usuario:", token);

      const configaxios = {
        headers: {
          "Authorization": `Bearer ${token}`, 
        }
      };
      console.log("VAR");
      console.log(params_symbol);
      console.log(params_price);
      const url = `${config.route}stocks/${params_symbol}?page=0&size=0`; 
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
    getInfo()
    // Datos de ejemplo (debes reemplazar esto con tus propios datos)
    const data = [
      { time: '2023-01-01', price: 100 },
      { time: '2023-01-02', price: 120 },
      { time: '2023-01-03', price: 130 },
      { time: '2023-01-04', price: 100 },
      { time: '2023-01-05', price: 120 },
      { time: '2023-01-06', price: 130 },
      { time: '2023-01-07', price: 130 },

    ];

    // Dimensiones del gráfico
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    
    //********************* Configuraciones Gráfico ***********************/

    // Escalas para mapear datos a píxeles
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.time)))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Línea generadora
    const line = d3
      .line()
      .x((d) => xScale(new Date(d.time)))
      .y((d) => yScale(d.price));

    // Crear SVG
    const svg = d3.select(chartRef.current).append('svg').attr('width', width).attr('height', height);

    // Agregar la línea al gráfico
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Agregar ejes
    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(5));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    //********************* Configuraciones Gráfico ***********************/

    }, [])


  return (
    <div className="DivPrincipalSearch">
      <div className="DivTitle">
        <h1 className="title">Simulación: {params_shortName}</h1>
      </div>

      <div className="MainDivListFields2">
        {fields_shown.map(r => (
          <div key={r.id} className="labelfield2">
            <p className="labelspecific">Empresa: {r.shortName}</p>
            <p className="labelspecific">Simbolo: {r.symbol}</p>
          </div>
        ))}
      </div>

      <div ref={chartRef}></div>

      <div className="DivTitleBack">
        <button type="" className='botonsubmit2' onClick={myfields}>Volver</button>
      </div>
    </div>
  );
}

export default ParticularPrediction;





