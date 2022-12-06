import { Dispatch, SetStateAction } from 'react'

type Props = {
	setCurrentPage: Dispatch<SetStateAction<string>>
}

const ResetPassword = ({ setCurrentPage }: Props) => {
	return <div>Reset password</div>
}

export default ResetPassword
