import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import img from "./../../imagens/livrariat5logo.png"

function HeaderProdutos() {
    const navigate = useNavigate();
    const [visivel, setVisivel] = useState(false);
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
            {visivel ?
                <Sidebar>
                    <Close onClick={() => setVisivel(false)}>X</Close>
                    <Login onClick={() => navigate("/login")}>Entre</Login>
                    <Signup onClick={() => navigate("/cadastro")}>Não é cliente? Cadastre-se</Signup>
                    <Logout onClick={() => encerrarSessao()}>Sair</Logout>
                </Sidebar> :
                "Não mostrar nada"}
            <Head>
                <Container>
                    <IconBars onClick={() => setVisivel(true)}>
                        <ion-icon name="reorder-three"></ion-icon>
                    </IconBars>
                    <Logo src={img} />
                    <IconCart onClick={() => navigate("/carrinho")}>
                        <ion-icon name="cart"></ion-icon>
                    </IconCart>
                </Container>
            </Head>
        </>
    )
}

const Sidebar = styled.div`
    width: 60%;
    height: 75%;
    background-color:  #F5980B;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    border-bottom-right-radius: 5px;
`
const Login = styled.button`
    width: 160px;
    margin-top: 20px;
    margin-left: 15px;
    margin-bottom: 18px;
    font-size: 25px;
    background-color: #FF8C00;
    border: 2px solid white;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
`
const Signup = styled.div`
    font-size: 25px;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin-left: 15px;
    margin-bottom: 18px;
`
const Logout = styled.div`
    font-size: 25px;
    color: white;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin-left: 15px;
    margin-bottom: 18px;
`
const Close = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    size: 10px;
    background-color: #ffffff;
    border-left: 2px solid red;
    border-bottom: 2px solid red;
    border-top: none;
    border-right: none;
    color: red;
`
const Head = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin-bottom: 67px;
`
const Container = styled.div`
    background-color: #FF8C00;
    width: 100%;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`
const Logo = styled.img`
    height: 67px;
    border-radius: 5px;
`
const IconCart = styled.button`
    font-size: 25px;
    background-color: white;
    color: #FF8C00;
    position: absolute;
    right: 0;
    border: none;
    border-radius: 5px;
    margin-right: 8px;
`
const IconBars = styled.button`
    font-size: 25px;
    background-color: white;
    color: #FF8C00;
    position: absolute;
    left: 0;
    border: none;
    border-radius: 5px;
    margin-left: 8px;
`
export default HeaderProdutos;