import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import Provider from '../context/Provider';
import userEvent from '@testing-library/user-event';


describe('Teste da aplicacão', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
  })
  afterEach(() => jest.restoreAllMocks());
  test('Teste da aplicacão', () => {
    render(<App />);
    const inputFilterText =  screen.getByTestId('name-filter');
    expect(inputFilterText).toBeInTheDocument();
    userEvent.type(inputFilterText, 'oo');

  });
  
  test('Teste se existe elemento table', async () => {
    render(<App />);
    const tableElement =  screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(10);
  });
  
  test('Teste se existe botao de filtrar', () => {
    render(<App />);
    const btnFilter =  screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument();
    userEvent.click(btnFilter);
  });
  
  test('Teste se existe botao de remover todos os filtros', () => {
    render(<App />);
    const btnRemoveAll =  screen.getByTestId(/button-remove-filters/i);
    expect(btnRemoveAll).toBeInTheDocument();
    userEvent.click(btnRemoveAll);
  });
  
  test('Teste se API é chamada', async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
  });

  test('Teste se existe botao de ordernar tabela', () => {
    render(<App />);
    const orderBtn =  screen.getByTestId('column-sort-button');
    expect(orderBtn).toBeInTheDocument();
    userEvent.click(orderBtn);
  });

  test('Teste se existe botao de rordernar tabela', async () => {
    render(<App />);
    const columnSelect = await screen.findByTestId('column-filter');
    const comparisonSelect = await screen.findByTestId('comparison-filter');
    const quantityInput = await screen.findByTestId('value-filter');
    expect(columnSelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(quantityInput).toBeInTheDocument();

    userEvent.selectOptions(columnSelect, "diameter");
    userEvent.selectOptions(comparisonSelect, "maior que");
    userEvent.type(quantityInput, '9000');

    const btnFilter =  screen.getByTestId('button-filter');
    userEvent.click(btnFilter);

    const tagFilter = await screen.findByTestId('filter');
    expect(tagFilter).toBeInTheDocument();

    await waitFor(() => {
      const planetsFirst = screen.getAllByTestId("planet-name");
      expect(planetsFirst).toHaveLength(7);
    });


    userEvent.selectOptions(columnSelect, "population");
    userEvent.selectOptions(comparisonSelect, "menor que");
    userEvent.clear(quantityInput)
    userEvent.type(quantityInput, '1000000');
    userEvent.click(btnFilter);

    // await waitFor(() => {
    const planetsSecond = await screen.findAllByTestId("planet-name");
    expect(planetsSecond).toHaveLength(2);
    // });

    userEvent.selectOptions(columnSelect, "rotation_period");
    userEvent.selectOptions(comparisonSelect, "igual a");
    userEvent.clear(quantityInput)
    userEvent.type(quantityInput, '23');
    userEvent.click(btnFilter);

    // await waitFor(() => {
    const planetsThird = await screen.findAllByTestId("planet-name");
    expect(planetsThird).toHaveLength(1);

    const deleteFilters = screen.getAllByAltText(/delete/i);
    expect(deleteFilters).toHaveLength(3);

    userEvent.click(deleteFilters[2]);

    const deleteFiltersSecond = screen.getAllByAltText(/delete/i);
    expect(deleteFiltersSecond).toHaveLength(2);

    const orderColumnSelect = screen.getByTestId('column-sort');
    const ascRadio = screen.getByTestId('column-sort-input-asc');
    const descRadio = screen.getByTestId('column-sort-input-desc');
    const orderBtn = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(orderColumnSelect, "population");
    userEvent.click(descRadio);
    userEvent.click(orderBtn);


    userEvent.selectOptions(orderColumnSelect, "population");
    userEvent.click(ascRadio);
    userEvent.click(orderBtn);

    userEvent.click(deleteFilters[1]);
    userEvent.click(deleteFilters[0]);

  });

});
