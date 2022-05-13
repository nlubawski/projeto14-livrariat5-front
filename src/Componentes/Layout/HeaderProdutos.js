import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import img from "./../../imagens/livrariat5logo.png"

function HeaderProdutos() {

    const navigate = useNavigate();

    const [visivel, setVisivel] = useState(false);

    return (
        <>
        {visivel?
         <Sidebar>
             <Close onClick={() => setVisivel(false)}>X</Close>
             <Login onClick={() => navigate("/login")}>Entre</Login>
             <Signup onClick={() => navigate("/cadastro")}>CADASTRE-SE</Signup>
         </Sidebar>:
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
    width: 250px;
    height: 75%;
    background-color: blue;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
`
const Login = styled.button`
    width: 125px;
    height: 45px;
    border-radius: 5px;
    margin: 20px;
`
const Signup = styled.p`
    font-size: 20px;
    color: white;
`
const Close = styled.button`
    position: absolute;
    top: 0;
    right: 0;
`
const Head = styled.div`
    position: fixed;
    top: 0;
    left: 0;
`
const Container = styled.div`
    background-color: lightgreen;
    width: 375px;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Logo = styled.img`
    width: 25%;
    border-radius: 5px;
`

const IconCart = styled.button`
    font-size: 25px;
    background-color: black;
    color: white;
    position: absolute;
    right: 0;
`

const IconBars = styled.button`
    font-size: 25px;
    background-color: black;
    color: white;
    position: absolute;
    left: 0;
`
export default HeaderProdutos;