import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  interface StarWarsCharacter{
    name: string;
  }

  const [character, setCharacter] = useState<string>("");

  useEffect(() => {
    getCharacter(1);
  }, []);

  const getCharacter = async (id: number) => {
    const apiResponse = await fetch(`https://swapi.dev/api/people/${id}`);
    const json = await apiResponse.json();
    setCharacter(json.name);
    console.log("*********** =>", json);
    console.log("****** =>",json.name);
  };

  return (

    <div >
      <h1>Starwars Character</h1>
      <h2>Name : {character}</h2>
    </div>
  );
}

export default App;
