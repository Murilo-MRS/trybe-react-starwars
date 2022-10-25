import { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export const arrOfOptions = [
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
  const [columnToOrder, setColumnToOrder] = useState('population');
  const [orderValue, setOrderValue] = useState('ASC');
  const [sortFilters, setSortFilters] = useState({});
  const [isOrdering, setIsOrdering] = useState(false);

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
  }, [planetList, isFiltering, multiFilter]);

  const orderTable = useCallback(() => {
    const { column: columnTosort, sort } = sortFilters;
    const arrayWithUnknown = planetList.filter((e) => e[columnTosort] === 'unknown');
    const arrayWithKnown = planetList.filter((e) => e[columnTosort] !== 'unknown');
    if (sort === 'ASC') {
      const sortPlanetList = arrayWithKnown
        .sort(({ [columnTosort]: a }, { [columnTosort]: b }) => (
          b - a
        ))
        .sort(({ [columnTosort]: a }, { [columnTosort]: b }) => (
          a - b
        ));
      setPlanetList([...sortPlanetList, ...arrayWithUnknown]);
    }
    if (sort === 'DESC') {
      const sortPlanetList = arrayWithKnown
        .sort(({ [columnTosort]: a }, { [columnTosort]: b }) => (
          b - a
        ));
      setPlanetList([...sortPlanetList, ...arrayWithUnknown]);
    }
  }, [sortFilters, planetList]);

  useEffect(() => {
    if (isOrdering) {
      orderTable();
      setIsOrdering(false);
    }
  }, [isOrdering, orderTable, planetList]);
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

  const handleColumnSort = ({ target }) => {
    setColumnToOrder(target.value);
  };

  const handleRadioInput = ({ target }) => {
    setOrderValue(target.value);
  };

  const handleFilterButton = (obj) => {
    setFilterByColumn((state) => [...state, obj]);
    setIsFiltering(true);
  };

  const handleClickToOrder = (col, orderType) => {
    setSortFilters({ column: col, sort: orderType });
    setIsOrdering(true);
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
        columnToOrder,
        handleColumnSort,
        orderValue,
        handleRadioInput,
        handleClickToOrder,
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
      columnToOrder,
      orderValue,
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
