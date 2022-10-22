import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SelectedFilters() {
  const { filterByColumn, handleRemoveClicked, handleRemoveAll } = useContext(AppContext);
  return (
    <section>
      {
        filterByColumn.map((e) => (
          <div key={ e.column } data-testid="filter">
            <span>{`${e.column} | ${e.comparison} | ${e.value}`}</span>
            <button
              type="button"
              onClick={ () => handleRemoveClicked(e.column) }
            >
              <img src="https://img.icons8.com/color/18/000000/delete-forever.png" alt="delete" />
            </button>
          </div>
        ))
      }
      <button
        type="button"
        onClick={ () => handleRemoveAll() }
        data-testid="button-remove-filters"
      >
        Remover Filtros
      </button>
    </section>
  );
}

export default SelectedFilters;
