import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState({})     // useState tiene un arreglo [], que en su primera posicion tiene un objeto donde se almacena nuestro estado y en la segunda una function que sirve para actualizar nuestro estado

  useEffect(() => {
    const pokeApiBaseUrl = `https://pokeapi.co/api/v2/pokemon`
    fetch(`${pokeApiBaseUrl}/charmeleon`)
    .then((res) =>{                             // Aca recibimos la respuesta el 
        return res.json()                       // convertimos la respues en json, que devuelve una promesa
    })
    .then((poke) =>{                         //aca ya recibimos al pokemon 
      setPokemon(poke)                  // <------------------ Aca llamo a la funcion de arriba de crear pokemones  
    })

  }, [])


console.log({pokemon})

  return (
    <div className="App">
      <div className='poke-card'>
        <h3>{ pokemon.name}</h3>
        <img src={pokemon.sprites?.front_default} alt=''/>
        <span>#{pokemon.id}</span>
      </div>
    </div>
  )
}

export default App;
