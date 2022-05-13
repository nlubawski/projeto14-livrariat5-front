import { useState } from "react";
import styled from "styled-components";
import HeaderCheckout from "./../Layout/HeaderCheckout"
import DadosComprador from "./DadosComprador";

function TelaCheckout() {

    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");

    return (
        <>
            <HeaderCheckout />
            <Container>
                <DadosComprador />
                <h1>Adicionar endereço de entrega</h1>
                <h4>Insira o nome da rua</h4>
                <Input
                    type="text"
                    placeholder="Rua, avenida, etc"
                    required
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                />
                <h4>Insira o nome da bairro</h4>
                <Input
                    type="text"
                    placeholder="Bairro"
                    required
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                />
                <h4>Insira o cep</h4>
                <Input
                    type="text"
                    placeholder="CEP"
                    required
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                />
            </Container>
        </>
    )
}

const Input = styled.input`
  height: 45px;
  width: 303px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #666;
  margin-bottom: 6px;
  &::placeholder {
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #dbdbdb;
  }
`

const Container = styled.div`
    background-color: yellow;
    width: 375px;
    padding-left: 5px;
    margin-top: 75px;
    position: relative;

    h1 {
        font-size: 20px;
        font-weight: bold;
        padding-top: 10px;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
    }

    p {
        font-size: 15px;
        margin-bottom: 10px;

    }
`

// display: flex;
// justify-content: center;
// align-items: center;

export default TelaCheckout;