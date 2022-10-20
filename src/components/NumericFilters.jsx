import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function NumericFilters() {
  const {
    column,
    handleColumn,
    comparison,
    handleComparison,
    value,
    handleValue,
    handleFilterButton,
    columnOptions,
  } = useContext(AppContext);

  return (
    <form>
      <label htmlFor="column">
        Coluna:
        <select
          name="column"
          id="column"
          value={ column }
          onChange={ handleColumn }
          data-testid="column-filter"
        >
          {
            columnOptions.map((e, index) => (
              <option key={ index } value={ e }>
                {e}
              </option>
            ))
          }
        </select>
      </label>
      <label htmlFor="comparison">
        Operador:
        <select
          name="comparison"
          id="comparison"
          value={ comparison }
          onChange={ handleComparison }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          name="value"
          id="value-filter"
          value={ value }
          onChange={ handleValue }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        onClick={ () => handleFilterButton({ column, value, comparison }) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </form>
  );
}

export default NumericFilters;
