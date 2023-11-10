import React, {useState, useEffect, useReducer, useContext, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import { ProductContext } from '.';

type InitialState = {
	count: 0;
};

type State = {
	count: number;
};

type Action = {
	type: ACTION_TYPE;
};

enum ACTION_TYPE {
	INCREMENT = "INCREMENT",
	DECREMENT = "DECREMENT",
};

const stateReducer: React.Reducer<State, Action> = (
	state: State,
	action: Action
): State => {
	switch (action.type) {
		case ACTION_TYPE.INCREMENT:
			return {...state, count: state.count + 1};
		case ACTION_TYPE.DECREMENT:
			return {...state, count: state.count - 1};
		default:
			return state;
	}
};

const App: React.FC<{}> = () => {
	const [state, dispatch] = useReducer<
			React.Reducer<State, Action>,
			InitialState
		>(
			stateReducer, 
			{count: 0}, 
			(state): State => ({
				...state,
				count: 1,
			})
		)

	const handleClick = () => {
		dispatch({type: ACTION_TYPE.INCREMENT});
	};

	const context = useContext(ProductContext);

	const ref = useRef<HTMLElement | null>(null)

	return (
		<div className="App">
			<header ref={ref} className="App-header">
				<p onClick={handleClick}>
					Count: {state.count}
				</p>
				<p>
					Selected product id: {context?.selectedProductId}
				</p>
			</header>
		</div>
	);
}

export default App;
