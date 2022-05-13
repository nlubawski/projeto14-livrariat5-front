import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import img from "./../../imagens/livrariat5logo.png"

function HeaderCheckout
    () {

    const navigate = useNavigate();

    const [visivel, setVisivel] = useState(false);

    function encerrarSessao () {
        // Apagar token
        // voltar para a página de compras
    }

    return (
        <>
            <Head>
                <Container>
                    <Logo src={img} />
                    <User>Olá, usuário</User>
                    <IconLogout onClick={() => navigate("/carrinho")}>
                        <ion-icon onClick={() => encerrarSessao()} name="log-out"></ion-icon>
                    </IconLogout>
                </Container>
            </Head>
        </>
    )
}


const Head = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
`
const Container = styled.div`
    background-color: lightgreen;
    width: 375px;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-bottom: 1px solid gray;
`

const Logo = styled.img`
    width: 25%;
    border-radius: 5px;
    position: absolute;
    left: 10px;
`

const User = styled.p`
    font-size: 18px;
`

const IconLogout = styled.button`
    font-size: 25px;
    background-color: black;
    color: white;
    position: absolute;
    right: 0;
`

export default HeaderCheckout