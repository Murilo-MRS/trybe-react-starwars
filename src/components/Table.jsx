import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Table() {
  const { data, name } = useContext(AppContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          data
            ?.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            .map((e) => (
              <tr key={ e.name }>
                {Object.values(e).map((element, index) => (
                  <td key={ index }>{element}</td>
                ))}
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

export default Table;
