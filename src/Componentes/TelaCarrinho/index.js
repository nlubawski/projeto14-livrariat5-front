import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import HeaderProdutos from "../Layout/HeaderProdutos";
import UsuarioContext from "./../Contextos/UsuarioContext"


function TelaCarrinho() {

    const [carrinho, setCarrinho] = useState([]);
    const servidor = "http://localhost:5000/carrinho";
    const { cliente } = useContext(UsuarioContext);
    const navigate = useNavigate();

    useEffect(() => {
        const promise = axios.get(servidor);
        promise.then((response) => {
            const { data } = response;
            setCarrinho(data);
        })
        promise.catch(() => console.log("deu ruim :/"));
    }, []);

    let total = 0;
    function calcularTotal() {
        carrinho.forEach(livro => total += parseFloat(livro.price))
        return total;
    }

    async function finalizar() {
        if (!cliente.token) {
            alert('faca login ou cadastre-se')
        }
        const body = {
            name: cliente.name,
            id: cliente.id
        };
        const headers = {
            headers: { "Authorization": `Bearer ${cliente.token}` }
        }
        try {
            await axios.post("http://localhost:5000/finalizar", body, headers);
            alert("Registro feito com sucesso!");
            navigate("/checkout");
        } catch (error) {
            console.log("Erro ao tentar finalizar");
            console.log(error);
        }
    }

    return (
        <>
            <HeaderProdutos />
            <Container>
                {carrinho.map(livro => {
                    const { title, price, author, id } = livro;
                    return (
                        <div key={id}>
                            <Books>
                                {title}
                                {price}
                            </Books>
                            <Books>
                                {author}
                            </Books>
                        </div>
                    )
                })
                }

                <Total>
                    Total: {calcularTotal()}
                </Total>
                <Finalizar onClick={() => finalizar()}>Finalizar Pedido</Finalizar>
                <NavLink to="/">
                    <EscolherMais>Escolher mais livros</EscolherMais>
                </NavLink>

            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Total = styled.div`
    width: 374px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;

        h2 {
            font-weight: 400;
            font-size: 24px;
            color: var(--cor-texto);
        }
`
const Books = styled.div`
    width: 374px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 10px;
`

const Finalizar = styled.button`
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

const EscolherMais = styled.button`
  height: 25px;
  width: 203px;
  background-color: #FF6C00;
  border: 1px solid #FF8C00;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: #fff;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

export default TelaCarrinho