import { useState } from "react";

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
}

export const useStore = () => {
	const [state, setState] = useState(initialState);

	const resetState = () => {
		setState(initialState);
	};

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
		resetState: resetState,
	};
};
