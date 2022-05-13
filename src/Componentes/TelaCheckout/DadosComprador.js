function DadosComprador() {

    const endereços = [{
        rua: "Rua X",
        bairro: "Bairro Y",
        cep: "CEP"
    }]


    // Fazer nessa página a importação dos dados do backend

    return (
        <>
            <h1>Dados do comprador</h1>
            <h2>Nome</h2>
            <p>Nome do usuário</p>
            <h2>CPF</h2>
            <p>CPF do usuário</p>
            <h1>Endereço de entrega</h1>
            <p>{endereços[0].rua}</p>
            <p>{endereços[0].bairro}</p>
            <p>{endereços[0].cep}</p>
        </>
    )
}

export default DadosComprador