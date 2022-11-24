import './Loader.css'

const Loader = ({ style = '' }: { style?: string }) => (
	<div className={['loader', style].join(' ')}>
		<div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }} className={`lds-ring`}>
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
)

export default Loader
