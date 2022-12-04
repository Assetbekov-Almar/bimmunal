'use client'

import { ErrorMessage, Formik } from 'formik'
import styles from './Auth.module.css'
import * as Yup from 'yup'
import { Form, Field } from 'formik'
import Loader from '../../components/Loader'
import { Dispatch, SetStateAction } from 'react'
import { Login } from '../../models/auth'
import { useAuth } from './useAuth'

const initialValues: Login = {
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	email: Yup.string().email('Невалидный email').required('Поле не может быть пустым'),
	password: Yup.string().required('Поле не может быть пустым'),
})

type Props = {
	setIsLoginPage: Dispatch<SetStateAction<boolean>>
}

const Login = ({ setIsLoginPage }: Props) => {
	const { onSubmit, isError, error, isLoading } = useAuth()

	return (
		<div className={styles.container}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className={styles.form}>
							{isLoading && <Loader style={'absolute'} />}
							<div>
								<label htmlFor='email'>Email : </label>
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
								<label htmlFor='password'>Пароль : </label>
								<Field
									type='password'
									name='password'
									className={
										formik.errors.password && formik.touched.password ? `${styles.input} ${styles.error}` : styles.input
									}
								/>
								<ErrorMessage name='password' component='div' className={styles.error_text} />
							</div>
							<div className={styles.form_footer}>
								<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
									Войти
								</button>
								<div className={styles.link} onClick={() => setIsLoginPage(false)}>
									Зарегистрироваться
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

export default Login
