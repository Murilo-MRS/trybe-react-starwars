import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const arrOfOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [planetList, setPlanetList] = useState([]);
  const [name, setName] = useState('');
  const [columnOptions, setColumnOptions] = useState(arrOfOptions);
  const [column, setColumn] = useState(columnOptions[0]);
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
        setPlanetList(dataResults);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    requestAPI();
  }, []);

  const multiFilter = useCallback(() => {
    filterByColumn.forEach((e) => {
      // setColumn(e.column);
      switch (e.comparison) {
      case 'maior que':
        return setPlanetList(planetList
          ?.filter((el) => Number(el[e.column]) > Number(e.value)));
      case 'menor que':
        return setPlanetList(planetList
          ?.filter((el) => Number(el[e.column]) < Number(e.value)));
      case 'igual a':
        return setPlanetList(planetList
          ?.filter((el) => Number(el[e.column]) === Number(e.value)));
      default:
        return data;
      }
    });
    setIsFiltering(false);
  }, [data, filterByColumn, planetList]);

  useEffect(() => {
    if (isFiltering) {
      multiFilter();
    }
  }, [data, isFiltering, multiFilter]);

  // ajuda do felipe pinto tribo 24A
  const optionsFiltered = useCallback(() => {
    const selectedFilters = filterByColumn.map((e) => e.column);
    const newOptions = columnOptions.filter((optionsColumn) => (
      !selectedFilters.includes(optionsColumn) && optionsColumn
    ));
    setColumnOptions(newOptions);
    setColumn(newOptions[0]);
  }, [filterByColumn, columnOptions]);

  useEffect(() => {
    optionsFiltered();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByColumn]);

  const handleRemoveAll = useCallback(() => {
    setColumnOptions(arrOfOptions);
    setFilterByColumn([]);
    setPlanetList(data);
  }, [data]);

  const handleRemoveClicked = useCallback((selected) => {
    if (filterByColumn.length >= 2) {
      const removedSelectedFilter = filterByColumn.filter((e) => (
        e.column !== selected
      ));
      // const xablau = filterByColumn[filterByColumn.length - 2];
      // console.log(xablau);
      // setPlanetList(filterByColumn[filterByColumn.length - 2].array);
      setColumnOptions([...columnOptions, selected]);
      setFilterByColumn(removedSelectedFilter);
      setPlanetList(data);
      setIsFiltering(true);
    }
    if (filterByColumn.length === 1) {
      setColumnOptions(arrOfOptions);
      setFilterByColumn([]);
      setPlanetList(data);
    }
  }, [filterByColumn, columnOptions, data]);

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
    // if (comparison === 'maior que') {
    //   const filter = data?.filter((el) => Number(el[column]) > Number(value));
    //   setPlanetList(filter);
    //   setFilterByColumn([...filterByColumn,
    //     { column, comparison, value, array: filter }]);
    // }
    // if (comparison === 'menor que') {
    //   const filter = data?.filter((el) => Number(el[column]) < Number(value));
    //   setPlanetList(filter);
    //   setFilterByColumn([...filterByColumn,
    //     { column, comparison, value, array: filter }]);
    // }
    // if (comparison === 'igual a') {
    //   const filter = data?.filter((el) => Number(el[column]) === Number(value));
    //   setPlanetList(filter);
    //   setFilterByColumn([...filterByColumn,
    //     { column, comparison, value, array: filter }]);
    // }
    setIsFiltering(true);
  };

  const contextValue = useMemo(
    () => (
      {
        data,
        planetList,
        name,
        column,
        comparison,
        value,
        filterByColumn,
        isFiltering,
        columnOptions,
        handleName,
        handleColumn,
        handleComparison,
        handleValue,
        handleFilterButton,
        handleRemoveClicked,
        handleRemoveAll,
      }
    ),
    [
      data,
      planetList,
      name,
      column,
      comparison,
      value,
      filterByColumn,
      isFiltering,
      columnOptions,
      handleRemoveClicked,
      handleRemoveAll,
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
