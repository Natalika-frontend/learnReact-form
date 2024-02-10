import { useStore} from "./hooks/useStore";
import { useRef, useState } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};
export const App = () => {
	const { getState, updateState, resetState} = useStore();

	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const submitButtonRef = useRef(null);


	const onPasswordChange = ({target}) => {
		updateState('password', target.value);
		let newError = null;
		if (target.value.length > 8) {
			newError = 'Некорректный пароль. Пароль должен быть длиной не более 8 знаков';
		}
		setPasswordError(newError);
	};

	const onEmailBlur = ({target}) => {
		if (target.value.trim() === '') {
			setEmailError('Поле email не может быть пустым');
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,}$/i.test(target.value)) {
			setEmailError('Неверный email. Введите адрес электронной почты в формате: address@mail.ru');
		} else {
			setEmailError(null);
		}
	};

	const onPasswordBlur = ({target}) => {
		if (target.value.length < 3) {
			setPasswordError('Некорректный пароль. Пароль должен быть длиной не менее 3 знаков');
		}
	};

	const onEmailChange = ({target}) => {
		updateState('email', target.value);
		if (emailError) {
			setEmailError(null);
		}
	};

	const onRepeatPasswordChange = ({target}) => {
		updateState('repeatPassword', target.value);
		let newError = null;
		if (password !== target.value) {
			newError = 'Пароли не совпадают!!!';
		}
		setPasswordError(newError);

		if (!!emailError || !!passwordError) {
			setTimeout(() => {
				submitButtonRef.current.focus();
			}, 0);
		}
	};

	const onSubmit = (evt) => {
		evt.preventDefault();
		const { email, password, repeatPassword } = getState();
		sendFormData({ email, password, repeatPassword });
		resetState();
	};

	const { email, password, repeatPassword } = getState();
	const isFormEmpty = email === '' || password === '' || repeatPassword === '';

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit} autoComplete="off">
				<label className={styles.label}>Форма регистрации</label>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				<input className={styles.item}
					   name="email"
					   type="email"
					   placeholder="Введите email"
					   value={email}
					   required
					   onChange={onEmailChange}
					   onBlur={onEmailBlur}
				/>
				{passwordError && <div className={styles.errorLabel}>{passwordError}</div>}
				<input
					className={styles.item}
					name="password"
					type="password"
					placeholder="Введите пароль"
					value={password}
					required
					onChange={onPasswordChange}
					onBlur={onPasswordBlur}
				/>
				<input
					className={styles.item}
					name="repeatPassword"
					type="password"
					placeholder="Повторите ваш пароль"
					value={repeatPassword}
					required
					onChange={onRepeatPasswordChange}
				/>
				<button className={styles.btn} ref={submitButtonRef} type="submit"
						disabled={!!emailError || !!passwordError || isFormEmpty}>Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
