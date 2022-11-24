'use client'

import { ErrorMessage, Formik } from 'formik'
import styles from './Auth.module.css'
import * as Yup from 'yup'
import { Form, Field } from 'formik'
import { useMutation } from '@tanstack/react-query'
import Loader from '../../components/Loader'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

type State = {
	email: string
	password: string
}

const initialValues: State = {
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	email: Yup.string().email('Невалидный email').required('Поле не может быть пустым'),
	password: Yup.string().required('Поле не может быть пустым'),
})

const Auth = () => {
	const { mutate, isLoading, isError, isSuccess } = useMutation((userData: State) => {
		return fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(userData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	})
	const router = useRouter()

	useEffect(() => {
		if (isSuccess) {
			router.push('/')
		}
	}, [isSuccess])

	const onSubmit = (values: State) => {
		mutate(values)
	}

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
							<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
								Войти
							</button>
							{isError && (
								<div className={styles.error_text}>Произошла ошибка при входе. Попробуйте ещё раз,пожалуйста.</div>
							)}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Auth
