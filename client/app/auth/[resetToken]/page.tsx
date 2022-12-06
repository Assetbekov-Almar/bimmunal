'use client'

import styles from '../Auth.module.css'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup'
import { Form, Field } from 'formik'
import Loader from '../../../components/Loader'
import { ResetPassword } from '../../../models/auth'
import { useAuth } from '../useAuth'
import { validateMatchPasswords } from '../validateMatchPasswords'

const initialValues: ResetPassword = {
	password: '',
	repeatPassword: '',
}

const validationSchema = Yup.object({
	password: Yup.string().required('Поле не может быть пустым').min(6, 'Минимальная длина 6 символов'),
	repeatPassword: Yup.string().required('Поле не может быть пустым'),
})

type Props = {
	params?: { resetToken: string }
}

const ResetPassword = ({ params }: Props) => {
	const { onSubmit, isError, error, isLoading } = useAuth()
	const { resetToken } = params!

	return (
		<div className={styles.container}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => onSubmit({ ...values, resetToken })}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<Form className={styles.form}>
							{isLoading && <Loader style={'absolute'} />}
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
									validate={(value: string) => validateMatchPasswords(formik.values.password, value)}
								/>
								<ErrorMessage name='repeatPassword' component='div' className={styles.error_text} />
							</div>
							<button type='submit' disabled={!formik.isValid || formik.isSubmitting}>
								Изменить пароль
							</button>
							{isError && <div className={styles.error_text}>{error as string}</div>}
						</Form>
					)
				}}
			</Formik>
		</div>
	)
}

export default ResetPassword
