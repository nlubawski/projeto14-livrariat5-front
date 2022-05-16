import styled from "styled-components";

function DadosComprador(props) {
    
    const {usuario} = props

    const {name, email} = usuario

    return (
        <Info>
            <h1>Dados do comprador</h1>
            <h2>Nome: <Span>{name}</Span></h2>
            <h2>email: <Span>{email}</Span></h2>
        </Info>
    )
}

const Info = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
        h1{
        font-weight: 700;
        }
`
const Span = styled.span`
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    
    `

export default DadosComprador