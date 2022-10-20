import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import mockData from './mockData';
import Provider from '../context/Provider';


describe('Teste da aplicacão', () => {
  afterEach(() => jest.clearAllMocks());
  test('Teste da aplicacão', () => {
    render(<Provider><App /></Provider>);
    const inputFilterText =  screen.getByTestId('name-filter');
    expect(inputFilterText).toBeInTheDocument();
  });
  
  test('Teste se existe elemento table', () => {
    render(<App />);
    const tableElement =  screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
  });
  
  test('Teste se API é chamada', () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => mockData }));
    render(<App />);
    expect(fetch).toHaveBeenCalled();
  });
  
  // test('Teste se API é chamada', () => {
  //   jest.spyOn(global, 'fetch').mockImplementation(async () => ({ json: async () => {throw new Error()} }));
  //   render(<App />);
  //   expect(fetch).rejects.toMatch('error');
  // });
});
