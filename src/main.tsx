import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';

const GlobalStyle = createGlobalStyle`
	body, html {
		width: 100vw;
		height: 100vh;
	}
	
	* {
		font-family: "Comic Sans MS",serif !important;
		//font-family: Roboto,serif;
	}
	
	#root {
		height: 100%;
	}
	
	.app-button {
	}
	
	.app-icon {
		width: 50px;
		height: 50px;
	}
`;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
