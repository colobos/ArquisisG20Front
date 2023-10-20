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
  const params_shortname = location.state.shortname;
  const params_prediction_value = location.state.prediction_value;
  const params_precios = location.state.precios;
  const params_dates = location.state.dates;


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
    } catch (error) {
      console.log(error, "hay error");
    }
  }

  useEffect(() => {
    getInfo()

    /* GRÁFICO */
    // Dimensiones del gráfico
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Escalas para mapear datos a píxeles
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(params_dates, (d) => new Date(d)))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(params_precios, (d) => d)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Línea generadora
    const line = d3
      .line()
      .x((d, i) => xScale(new Date(params_dates[i])))
      .y((d) => yScale(d));

    // Crear SVG
    const svg = d3.select(chartRef.current).append('svg').attr('width', width).attr('height', height);

    // Agregar la línea al gráfico
    svg
      .append('path')
      .datum(params_precios)
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
    }, [params_precios, params_dates]);


  return (
    <div className="DivPrincipalSearch">
      <div className="DivTitle">
        <h1 className="title">Simulación: {params_shortname}</h1>
      </div>

      <div className="MainDivListFields2">
        {fields_shown.map(r => (
          <div key={r.id} className="labelfield2">
            <p className="labelspecific">Empresa: {r.shortname}</p>
            <p className="labelspecific">Simbolo: {r.symbol}</p>
          </div>
        ))}
      </div>
      <p className="labelspecific">Predicción: {params_prediction_value}</p>

      <div ref={chartRef}></div>

      <div className="DivTitleBack">
        <button type="" className='botonsubmit2' onClick={myfields}>Volver</button>
      </div>
    </div>
  );
}

export default ParticularPrediction;





