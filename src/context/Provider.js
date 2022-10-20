import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [filterByColumn, setFilterByColumn] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const dataApi = await response.json();
        const dataResults = dataApi.results.map((element) => {
          delete (element.residents);
          return element;
        });
        setData(dataResults);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    requestAPI();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const multiFilter = () => {
    filterByColumn.forEach((e) => {
      switch (e.comparison) {
      case 'maior que':
        return setData(data?.filter((el) => Number(el[e.column]) > Number(e.value)));
      case 'menor que':
        return setData(data?.filter((el) => Number(el[e.column]) < Number(e.value)));
      case 'igual a':
        return setData(data?.filter((el) => Number(el[e.column]) === Number(e.value)));
      default:
        return data;
      }
    });
    setIsFiltering(false);
  };
// ajuda do felipe pinto tribo 24A
  useEffect(() => {
    if (isFiltering) {
      multiFilter();
    }
  }, [data, multiFilter, isFiltering]);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  const handleColumn = ({ target }) => {
    setColumn(target.value);
  };

  const handleComparison = ({ target }) => {
    setComparison(target.value);
  };

  const handleValue = ({ target }) => {
    setValue(target.value);
  };

  const handleFilterButton = (obj) => {
    setFilterByColumn((state) => [...state, obj]);
    setIsFiltering(true);
  };

  const contextValue = useMemo(
    () => (
      {
        data,
        name,
        handleName,
        column,
        handleColumn,
        comparison,
        handleComparison,
        value,
        handleValue,
        handleFilterButton,
        filterByColumn,
        isFiltering,
      }
    ),
    [
      data,
      name,
      column,
      comparison,
      value,
      filterByColumn,
      isFiltering,
    ],
  );

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
