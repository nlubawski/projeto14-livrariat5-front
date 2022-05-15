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
        total = total.toFixed(2);
        total = total.replace(".",", ");
        return total;
    }

    async function finalizar() {
        console.log("tokenzinho", cliente)
        if (cliente === null) {
            return alert('faca login ou cadastre-se')
            
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
                <Titulo>Seus Produtos!</Titulo>
                {carrinho.map(livro => {
                    const { title, price, author, id } = livro;
                    return (
                        <div key={id}>
                            <Books>
                                <p>{title}</p>
                                <h1>{price}</h1>
                            </Books>
                            <Autor>
                                <p>{author}</p>
                            </Autor>
                        </div>
                    )
                })
                }

                <Total>
                    <h2>Total: R$ <span>{calcularTotal()}</span></h2>
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
    width: 100%;
    margin-top: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Titulo = styled.div`
    font-size: 24px;
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;

`
const Total = styled.div`
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto', sans-serif;


        h2 {
            font-family: 'Roboto', sans-serif;
            font-weight: 400;
            font-size: 20px;
        }

        span{
            font-weight: bold;
        }

`
const Books = styled.div`
    width: 85vw;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-family: 'Roboto', sans-serif;

    h1{
        font-weight:bold;
    }
`
const Autor = styled.div`
    width: 85vw;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 14px;
`

const Finalizar = styled.button`
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

const EscolherMais = styled.button`
  height: 25px;
  width: 203px;
  background-color: #FF6C00;
  border: 1px solid #FF8C00;
  border-radius: 5px;
  font-family: 'Roboto', sans-serif;
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