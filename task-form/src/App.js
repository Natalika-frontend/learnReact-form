import { useRef, useState } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};
export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const submitButtonRef = useRef(null);

	const onEmailChange = ({target}) => {
		setEmail(target.value);
		let newError = null;
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(target.value)) {
			newError = 'Неверный email. Введите адрес электронной почты в формате: address@mail.ru';
		}
		setEmailError(newError);
	};

	const onPasswordChange = ({target}) => {
		setPassword(target.value);
		let newError = null;
		if (target.value.length < 3) {
			newError = 'Некорректный пароль. Пароль должен быть длиной не менее 3 знаков';
		} else if (target.value.length > 8) {
			newError = 'Некорректный пароль. Пароль должен быть длиной не более 8 знаков';
		}
		setPasswordError(newError);
	};

	const onRepeatPasswordChange = ({target}) => {
		setRepeatPassword(target.value);
		let newError = null;
		if (password !== target.value) {
			newError = 'Пароли не совпадают!!!';
		}
		setPasswordError(newError)
	};

	const onEmailBlur = ({target}) => {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(target.value)) {
			setEmailError('Неверный email. Введите адрес электронной почты в формате: address@mail.ru');
		}
	};

	const onPasswordBlur = ({target}) => {
		if (target.value.length < 3) {
			setPasswordError('Некорректный пароль. Пароль должен быть длиной не менее 3 знаков');
		} else if (target.value.length > 8) {
			setPasswordError('Некорректный пароль. Пароль должен быть длиной не более 8 знаков');
		}
	};

	const onSubmit = (evt) => {
		evt.preventDefault();
		sendFormData({email, password, repeatPassword})
	};

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
						disabled={!!emailError || !!passwordError}>Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
