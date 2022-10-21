import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function SelectedFilters() {
  const { filterByColumn, handleRemoveClicked, handleRemoveAll } = useContext(AppContext);
  return (
    <section>
      {
        filterByColumn.map((e) => (
          <button
            key={ e.column }
            type="button"
            data-testid="filter"
            onClick={ () => handleRemoveClicked(e.column) }
          >
            {`${e.column} | ${e.comparison} | ${e.value}`}
            {' '}
            <img src="https://img.icons8.com/color/18/000000/delete-forever.png" alt="delete" />
          </button>
        ))
      }
      <button
        type="button"
        onClick={ () => handleRemoveAll() }
      >
        Remover Filtros
      </button>
    </section>
  );
}

export default SelectedFilters;
