import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';

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

const Formulario = () => {

  // state listado criptomoneda
  const [listacripto, setListacripto] = useState([]);

  const MONEDAS = [
    { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
    { codigo: 'MXN', nombre: 'Peso Mexicano' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra Esterlina' },
  ]

  // Utilizar useMoneda
  const [moneda, Seleccionar, setState] = useMoneda('Elige tu Moneda:', '', MONEDAS);
  // Actualizar Criptomoneda
  const [criptomoneda, SelectCripto, setCriptomoneda] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)
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

  }

  return (
    <form
      onSubmit={cotizarMoneda}>
      {error ? 'Hay un error' : null}
      <Seleccionar></Seleccionar>
      <SelectCripto></SelectCripto>
      <Boton type="submit" value="Calcular" />
    </form>
  );
}

export default Formulario;