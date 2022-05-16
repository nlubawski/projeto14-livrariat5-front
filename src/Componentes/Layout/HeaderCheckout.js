import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import img from "./../../imagens/livrariat5logo.png"

function HeaderCheckout() {
    const nomeLS = localStorage.getItem("nome");
    const navigate = useNavigate();

    function encerrarSessao() {
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
    background-color: #FF8C00;
    width: 100vw;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
const Logo = styled.img`
    height: 67px;
    border-radius: 5px;
    position: absolute;
    left: 15px;
`
const User = styled.p`
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    color: #fff;
`
const IconLogout = styled.button`
    font-size: 25px;
    background-color: white;
    color: #FF8C00;
    position: absolute;
    right: 0;
    border: none;
    border-radius: 5px;
    margin-right: 8px;
`
export default HeaderCheckout
