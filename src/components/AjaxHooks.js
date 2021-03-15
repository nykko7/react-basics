import React, { useState, useEffect } from 'react';

function Pokemon({ avatar, name }) {
	return (
		<figure>
			<img src={avatar} alt={name} />
			<figcaption>{name}</figcaption>
		</figure>
	);
}

export default function AjaxHooks() {
	const [pokemons, setPokemons] = useState([]);

	// useEffect(() => {
	//   let url = 'https://pokeapi.co/api/v2/pokemon/';
	//   fetch(url)
	//     .then(res =>res.json())
	//     .then(json => {
	//       json.results.forEach(el => {
	//         fetch(el.url)
	//         .then(res => res.json())
	//         .then(json => {
	//           let pokemon  = {
	//             id: json.id,
	//             name: json.name,
	//             avatar: json.sprites.front_default,
	//           };
	//           setPokemons((pokemons) => [...pokemons, pokemon]);
	//         });
	//       });
	//     });
	// }, []);

	useEffect(() => {
		const getPokemon = async (pokemonData) => {
			let res = await fetch(pokemonData.url),
				json = await res.json();

			let pokemon = {
				id: json.id + 40,
				name: json.name,
				avatar: json.sprites.front_default,
			};
			setPokemons((pokemons) => [...pokemons, pokemon]);
		};

		const getPokemons = async (url) => {
			let res = await fetch(url),
				json = await res.json();
			const promises = json.results.map(async (result) => await getPokemon(result));
			await Promise.all(promises);
			// for (let i=0; i < json.results.length; i++) {
			//   await getPokemon(json.results[i]);
			// }

			// json.results.forEach(async (el) => {
			//   let res = await fetch(el.url),
			//     json = await res.json();

			//     let pokemon  = {
			//       id: json.id,
			//       name: json.name,
			//       avatar: json.sprites.front_default,
			//     };
			//     setPokemons((pokemons) => [...pokemons, pokemon]);
			// });
		};
		getPokemons('https://pokeapi.co/api/v2/pokemon/');
	}, []);

	return (
		<>
			<h2>Peticiones Asíncronas en Hooks</h2>
			{pokemons.length === 0 ? <h3>Cargando...</h3> : pokemons.map((el) => <Pokemon key={el.id} name={el.name} avatar={el.avatar} />)}
		</>
	);
}

// Muchas gracias por la clase Jon, entendí todo, solo me quedo una duda, me pasa que a veces al refrescar la página la lista de pokemones inicia con Charmander, saltandose a Bulbasaur y sus evoluciones. Sabes cual podría ser el problema? o como averiguarlo?
