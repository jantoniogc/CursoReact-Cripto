import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';

const Boton = styled.input` 
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #FFF;
  transition: background-color .3s ease;

  &:hover {
    background-color: #326AC0;
    cursor: pointer;
  }
`;

const Formulario = ({setMoneda, setCriptomoneda}) => {

  // state listado criptomoneda
  const [listacripto, setListacripto] = useState([]);

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
  ]

  // Utilizar useMoneda
  const [moneda, Seleccionar] = useMoneda('Elige tu Moneda:', '', MONEDAS);
  // Actualizar Criptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)
  const [error, setError] = useState(false);


  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await Axios.get(url);
      setListacripto(resultado.data.Data);
    }
    consultarAPI();
  }, [])

  const cotizarMoneda = (e) => {
    e.preventDefault();
    if (moneda === '' || criptomoneda === '') {
      setError(true);
      return;
    }
    setError(false);
    // Pasar componente a datos principal
    setMoneda(moneda);
    setCriptomoneda(criptomoneda);
  }

  return (
    <form
      onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios"></Error> : null}
      <Seleccionar></Seleccionar>
      <SelectCripto></SelectCripto>
      <Boton type="submit" value="Calcular" />
    </form>
  );
}

Formulario.propTypes = {
  setMoneda: PropTypes.func.isRequired, 
  setCriptomoneda: PropTypes.func.isRequired
}
export default Formulario;