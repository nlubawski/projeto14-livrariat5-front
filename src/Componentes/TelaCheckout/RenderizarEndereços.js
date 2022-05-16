import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components"

function RenderizarEndereços() {
    const tokenLS = localStorage.getItem("token");
    const idLS = localStorage.getItem("id");
    const [addresses, setAddresses] = useState([]);
    const servidorAddress = "http://localhost:5000/address";
    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }
    useEffect(() => {
        const promise = axios.get(servidorAddress, config);
        promise.then((response) => {
            const { data } = response;
            setAddresses(data);
            // TIRAR DEPOIS ESSE CONSOLE
            // console.log("Deu bom a requisição dos endereços")
            // console.log(data);
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

    return (
        <>

            {addresses.map(address => {
                const { destinatario, rua, bairro, cep, _id } = address
                return (
                    <>
                        <Container key={_id}>
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