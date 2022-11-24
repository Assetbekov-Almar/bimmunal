'use client'

import { ErrorMessage, Formik } from 'formik'
import styles from './Auth.module.css'
import * as Yup from 'yup'
import { Form, Field } from 'formik'

type State = {
	email: string
	password: string
}

const initialValues: State = {
	email: '',
	password: '',
}

const validationSchema = Yup.object({
	email: Yup.string().email('invalid email').required('required'),
	password: Yup.string().required('required'),
})

const Auth = () => {
	const onSubmit = (values: State, submittingObject: any) => {
		console.log(values)
	}

	return (
		<div className={styles.container}>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				{(formik) => {
					return (
						<Form className={styles.form}>
							<div>
								<label htmlFor='email'>Email : </label>
								<Field
									type='email'
									name='email'
									className={
										formik.errors.email && formik.touched.email ? `${styles.input} ${styles.error}` : styles.input
									}
								/>
								<ErrorMessage name='email' component='div' className={styles.input_feedback} />
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
								<ErrorMessage name='password' component='div' className={styles.input_feedback} />
							</div>
							<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
								Войти
							</button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default Auth
