import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { arrOfOptions } from '../context/Provider';

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
    columnToOrder,
    handleColumnSort,
    orderValue,
    handleRadioInput,
    handleClickToOrder,
  } = useContext(AppContext);

  return (
    <form>
      <div>
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
      </div>
      <div>
        <select
          name="comparison"
          id="comparison"
          value={ columnToOrder }
          onChange={ handleColumnSort }
          data-testid="column-sort"
        >
          {
            arrOfOptions.map((e) => (
              <option key={ e } value={ e }>
                {e}
              </option>
            ))
          }
        </select>
        <label htmlFor="ASC">
          <input
            type="radio"
            name="sort"
            id="ASC"
            value="ASC"
            data-testid="column-sort-input-asc"
            checked={ orderValue === 'ASC' }
            onChange={ handleRadioInput }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            type="radio"
            name="sort"
            id="DESC"
            value="DESC"
            data-testid="column-sort-input-desc"
            checked={ orderValue === 'DESC' }
            onChange={ handleRadioInput }
          />
          Descendente
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => handleClickToOrder(columnToOrder, orderValue) }
        >
          Ordernar
        </button>
      </div>
    </form>
  );
}

export default NumericFilters;
