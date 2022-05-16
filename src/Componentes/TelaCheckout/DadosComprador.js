function DadosComprador(props) {
    
    const {usuario} = props

    const {name, email} = usuario

    return (
        <>
            <h1>Dados do comprador</h1>
            <h2>Nome</h2>
            <p>{name}</p>
            <h2>email</h2>
            <p>{email}</p>
        </>
    )
}

export default DadosComprador