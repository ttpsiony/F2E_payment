import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import 'tailwindcss/tailwind.css';
import App from './App';
import ContextStore, { reducer, initialState } from './context/ContextStore';

function Index() {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<React.StrictMode>
			<BrowserRouter>
				<ContextStore.Provider
					value={{
						state,
						dispatch,
					}}
				>
					<App />
				</ContextStore.Provider>
			</BrowserRouter>
		</React.StrictMode>
	);
}

ReactDOM.render(<Index />, document.getElementById('root'));
