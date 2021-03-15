import React from 'react';
import { useFetch } from '../hooks/useFetch';

export default function HooksPersonalizados() {
	let url = 'https://pokeapi.co/api/v2/pokemon/';
	// url = 'https://jsonplaceholder.typicode.com/users';
	console.log(useFetch(url));

	let { data, isPending, error } = useFetch(url);
	return (
		<>
			<h2>Hooks Personalizados</h2>
			<h3>isPending: {JSON.stringify(isPending)}</h3>
			<h3>
				<mark>error: {JSON.stringify(error)}</mark>
			</h3>
			<h3>
				<pre style={{ whiteSpace: 'pre-wrap', fontSize: '1rem' }}>
					<code>{JSON.stringify(data)}</code>
				</pre>
			</h3>
		</>
	);
}
