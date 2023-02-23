import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  interface StarWarsCharacter{
    _id: number;
    name: string;
  }

  const [character, setCharacter] = useState<StarWarsCharacter>();

  useEffect(() => {
    getCharacter(1);
  }, []);

  const getCharacter = async (id: number) => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/${id}`);
    const json = await apiResponse.json() as StarWarsCharacter;
    setCharacter(json);
  };

  return (

    <div >
      <h2>Starwars Character </h2>
      <>Name : {character?.name}</>
    </div>
  );
}

export default App;
