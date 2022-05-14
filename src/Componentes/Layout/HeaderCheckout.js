import { useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UsuarioContext from "./../Contextos/UsuarioContext"
import styled from "styled-components";
import img from "./../../imagens/livrariat5logo.png"

function HeaderCheckout () {

    // const {cliente} = useContext(UsuarioContext);

    // const {name} = cliente;

    const nomeLS = localStorage.getItem("nome");

    const navigate = useNavigate();

    const [visivel, setVisivel] = useState(false);

    function encerrarSessao () {
        const mensagem = "Deseja fazer o logout?";
        const resultado = window.confirm(mensagem)
        if (resultado) {
        navigate("/")
        localStorage.clear();
        }
    }

    return (
        <>
            <Head>
                <Container>
                    <Logo src={img} />
                    <User>Olá, {nomeLS}</User>
                    <IconLogout>
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
