import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const handleName = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    const requestAPI = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const dataApi = await response.json();
        setData(dataApi);
      } catch (e) {
        throw new Error(e.message);
      }
    };
    requestAPI();
  }, []);

  const contextValue = useMemo(
    () => (
      {
        data,
        name,
        handleName,
      }
    ),
    [
      data, name,
      setName,
    ],
  );

  // data,
  // name,
  // gender,
  // episode,
  // handleEpisode,
  // handleGender,
  // handleName,
  // quanty,
  // handleQuanty

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
