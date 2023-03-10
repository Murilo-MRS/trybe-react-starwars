import React from 'react';
import './App.css';
import FilterName from './components/FilterName';
import NumericFilters from './components/NumericFilters';
import SelectedFilters from './components/SelectedFilters';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <h1>StarWars Planets</h1>
      <FilterName />
      <NumericFilters />
      <SelectedFilters />
      <Table />
    </Provider>
  );
}

export default App;
