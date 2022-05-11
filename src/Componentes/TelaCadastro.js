import { useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import img from "./../imagens/livrariat5logo.png";




function TelaCadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function cadastrar(event) {
    event.preventDefault();

    const URL =
      "http://localhost:5000/cadastrar";

    const promise = axios.post(URL, {
      name,
      email,
      password,
      confirmPassword,
    });

    promise.then((response) => {
      const { data } = { response };
      //navigate('/')
    });
    promise.catch((err) => {
      console.log(err.response)
    });
  }

  return (
    <>
      <Container>
        <Logo src={img}/>
        <Formulario onSubmit={cadastrar}>
          <Input
            type="text"
            placeholder="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirme sua senha"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Botao type="submit">Entrar
          </Botao>
          <Texto>
            <Link to="/">Já tem uma conta? Entre agora!</Link>
          </Texto>
        </Formulario>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #F5980B;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
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
`;
const Botao = styled.button`
  height: 45px;
  width: 303px;
  background-color: #FF6C00;
  border: 1px solid #FF8C00;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Texto = styled.p`
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 14px;
  a{
    color: #fff;
  }
`;

const Logo = styled.img`
width: 35%;
border-radius: 5px;
padding-bottom: 15px;

`;

export default TelaCadastro;