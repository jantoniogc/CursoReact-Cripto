import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Label = styled.label `
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-transform: uppercase;
  font-weight: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select `
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
  //Stare de nuestro custom Hook
  const [state, setState] = useState(stateInicial);

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
        onChange={ e => setState(e.target.value)}
        value={state}>
          <option value="">-- Seleccione --</option>
          {opciones.map(opcion => (
            <option key={opcion.CoinInfo.id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
          ))}
      </Select>
    </Fragment>
  );

  return [state, SelectCripto, setState];

}

useCriptomoneda.propTypes = {
  label: PropTypes.string.isRequired, 
  stateInicial: PropTypes.object.isRequired,
  opciones: PropTypes.array.isRequired
}

export default useCriptomoneda;