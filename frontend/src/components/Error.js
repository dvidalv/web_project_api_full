function Error({ error}) {
	return (
		<div style={{ color: 'red' }}>
			<pre>{error}</pre>
		</div>
	)
}

export default Error
