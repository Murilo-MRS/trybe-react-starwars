import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterName() {
  const { name, handleName } = useContext(AppContext);
  return (
    <label htmlFor="name" data-testid="name-filter">
      Paneta:
      <input
        type="text"
        name={ name }
        id="name"
        value={ name }
        onChange={ handleName }
      />
    </label>
  );
}

export default FilterName;
