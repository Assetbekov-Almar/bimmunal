'use client'

import styles from './Auth.module.css'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Field } from 'formik'
import Loader from '../../components/Loader'
import { ForgotPassword } from '../../models/auth'
import { useAuth } from './useAuth'

const initialValues: ForgotPassword = {
	email: '',
}

const validationSchema = Yup.object({
	email: Yup.string().email('Невалидный email').required('Поле не может быть пустым'),
})

const ForgotPassword = () => {
	const { onSubmit, isError, error, isLoading } = useAuth()

	return (
		<div className={styles.container}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className={styles.form}>
							{isLoading && <Loader style={'absolute'} />}
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
							<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
								Получить ссылку
							</button>
							{isError && <div className={styles.error_text}>{error as string}</div>}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default ForgotPassword
