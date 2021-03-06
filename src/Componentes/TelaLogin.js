
import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import dotenv from "dotenv"
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import img from "./../imagens/livrariat5logo.png";
import UsuarioContext from "./Contextos/UsuarioContext"

function TelaLogin() {

  dotenv.config();
  //const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"
  const URL_ENV = "https://livrariat5.herokuapp.com"

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCliente } = useContext(UsuarioContext);

  function cadastrar(event) {
    event.preventDefault();
    setLoading(true);

    const URL = `${URL_ENV}/login`;

    const promise = axios.post(URL, {
      email,
      password,
    });

    promise.then((response) => {
      const { data } = response;
      const { name, token, clienteId } = data;
      setCliente({ name, token, clienteId });
      setTimeout(() => setLoading(false), 3000);
      localStorage.setItem("nome", name);
      localStorage.setItem("token", token);
      localStorage.setItem("id", clienteId);
      navigate('/');
    });
    promise.catch((err) => {
      setEmail("");
      setPassword("");
      console.log(err.response)
      setTimeout(() => setLoading(false), 3000);
      alert("Tente novamente ou cadastre-se!")
    });
  }

  return (
    <>
      <Container>
        <Logo src={img} />
        <Formulario onSubmit={cadastrar}>
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading ? true : false}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading ? true : false}
          />
          <Botao type="submit">{loading ? <ThreeDots color="#fff" /> : 'Entrar'}
          </Botao>
          <Texto>
            <NavLink to="/cadastro">N??o tem uma conta? Crie agora!</NavLink>
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
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #fff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Texto = styled.p`
  font-family: 'Roboto', sans-serif;
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
const NavLink = styled(Link)`
  text-decoration: none;
`;

export default TelaLogin;