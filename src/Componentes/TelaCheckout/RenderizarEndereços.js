import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import styled from "styled-components"

function RenderizarEndereços(props) {

    dotenv.config();

    const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"

    const {endereçoSelecionado, setEndereçoSelecionado} = props;

    const tokenLS = localStorage.getItem("token");
    const idLS = localStorage.getItem("id");

    const [addresses, setAddresses] = useState([]);

    const URL_ADDRESS = `${URL_ENV}/address`;
    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }
    useEffect(() => {
        const promise = axios.get(URL_ADDRESS, config);
        promise.then((response) => {
            const { data } = response;
            setAddresses(data);
        })
        promise.catch(() => console.log("deu ruim baixar as informações dos endereços"));
    }, []);

    function deletarEndereço(id) {
        console.log("Entrei na função de deletar o endereço")
        const servidorDeletar = `http://localhost:5000/address/${id}`;
        const promise = axios.delete(servidorDeletar)
        promise.then(response => {
            const { data } = response;
            console.log(data);
            setTimeout(() => window.location.reload(), 1000);
        })
        promise.catch(() => console.log("deu ruim em deletar o endereço"));
    }

    function ativarEndereço (id) {
        console.log("Clicado com sucesso");
        const jaSelecionado = endereçoSelecionado.has(id); 
        if (jaSelecionado) { 
            endereçoSelecionado.delete(id); 
            setEndereçoSelecionado(new Map(endereçoSelecionado)); 
            console.log("Nada acontece")
        }
        else { 
            endereçoSelecionado.clear();
            setEndereçoSelecionado(new Map(endereçoSelecionado.set(id)));
        }
    }

     return (
        <>
            {addresses.map(address => {
                const { destinatario, rua, bairro, cep, _id } = address;
                const checkSelecionado = endereçoSelecionado.has(_id)
                return (
                    <>
                        <Container selecionado={checkSelecionado} key={_id} onClick={() => ativarEndereço(_id)}>
                            <h5>{destinatario}</h5>
                            <IconDelete onClick={() => deletarEndereço(_id)}>
                                <ion-icon name="close-circle"></ion-icon>
                            </IconDelete>
                            <p>{rua}</p>
                            <p>{bairro}</p>
                            <p>{cep}</p>
                        </Container>
                    </>
                )
            })}
        </>
    )
}

function corBorda(selecionado) {
    if (selecionado) return "3px solid red";
    else return "none";
}

const IconDelete = styled.button`
    font-size: 25px;
    background-color: #fff;
    border: 0;
    color: red;
    position: absolute;
    top: 10px;
    right: 5px;
`
const Container = styled.div`
    width: 350px;
    min-height: 120px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border: ${(props) => corBorda(props.selecionado)};
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    background-color: #fff;
    position: relative;
    margin: 10px 0;
`

export default RenderizarEndereços