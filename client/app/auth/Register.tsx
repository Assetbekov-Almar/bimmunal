'use client'

import styles from './Auth.module.css'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Field } from 'formik'
import Loader from '../../components/Loader'
import { Register } from '../../models/auth'
import { Dispatch, SetStateAction } from 'react'
import { useAuth } from './useAuth'
import { LOGIN } from './constants'

const initialValues: Register = {
	username: '',
	email: '',
	password: '',
	repeatPassword: '',
}

const validationSchema = Yup.object({
	username: Yup.string().required('Поле не может быть пустым').min(5, 'Минимальная длина 2 символа'),
	email: Yup.string().email('Невалидный email').required('Поле не может быть пустым'),
	password: Yup.string().required('Поле не может быть пустым').min(6, 'Минимальная длина 6 символов'),
	repeatPassword: Yup.string().required('Поле не может быть пустым'),
})

type Props = {
	setCurrentPage: Dispatch<SetStateAction<string>>
}

const Register = ({ setCurrentPage }: Props) => {
	const { onSubmit, isError, error, isLoading } = useAuth()

	const validateConfirmPassword = (pass: string, value: string) => {
		let error = ''
		if (pass && value && pass !== value) {
			error = 'Пароли не совпадают'
		}
		return error
	}

	return (
		<div className={styles.container}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className={styles.form}>
							{isLoading && <Loader style={'absolute'} />}
							<div>
								<label htmlFor='username'>Ф.И.О.: </label>
								<Field
									type='text'
									name='username'
									className={
										formik.errors.username && formik.touched.username ? `${styles.input} ${styles.error}` : styles.input
									}
								/>
								<ErrorMessage name='username' component='div' className={styles.error_text} />
							</div>
							<div style={{ marginTop: '10px' }}>
								<label htmlFor='email'>Email: </label>
								<Field
									type='email'
									name='email'
									className={
										formik.errors.email && formik.touched.email ? `${styles.input} ${styles.error}` : styles.input
									}
								/>
								<ErrorMessage name='email' component='div' className={styles.error_text} />
							</div>
							<div style={{ marginTop: '10px' }}>
								<label htmlFor='password'>Пароль: </label>
								<Field
									type='password'
									name='password'
									className={
										formik.errors.password && formik.touched.password ? `${styles.input} ${styles.error}` : styles.input
									}
								/>
								<ErrorMessage name='password' component='div' className={styles.error_text} />
							</div>
							<div style={{ marginTop: '10px' }}>
								<label htmlFor='repeatPassword'>Повторите пароль: </label>
								<Field
									type='password'
									name='repeatPassword'
									className={
										formik.errors.repeatPassword && formik.touched.repeatPassword
											? `${styles.input} ${styles.error}`
											: styles.input
									}
									validate={(value: string) => validateConfirmPassword(formik.values.password, value)}
								/>
								<ErrorMessage name='repeatPassword' component='div' className={styles.error_text} />
							</div>
							<div className={styles.form_footer}>
								<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
									Создать
								</button>
								<div className={styles.link} onClick={() => setCurrentPage(LOGIN)}>
									Уже есть аккаунт?
								</div>
							</div>
							{isError && <div className={styles.error_text}>{error as string}</div>}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Register
