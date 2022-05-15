import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UsuarioContext from "../Contextos/UsuarioContext"
import styled from "styled-components"

function DadosComprador() {

    const idLS = localStorage.getItem("id");
    const tokenLS = localStorage.getItem("token");
    const [user, setUser] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }

    const servidorCheckout = "http://localhost:5000/checkout";

    useEffect(() => {
        const promise = axios.get(servidorCheckout, config);
        promise.then((response) => {
            const { data } = response;
            setUser(data);
            // TIRAR DEPOIS ESSE CONSOLE
            // console.log("Deu bom a requisição")
            // console.log(data);
        })
        promise.catch(() => console.log("deu ruim baixar as informações do usuário"));
    }, []);
    return (
        <>
            <h1>Dados do comprador</h1>
            <h2>Nome</h2>
            <p>{user.name}</p>
            <h2>email</h2>
            <p>{user.email}</p>
        </>
    )
}

export default DadosComprador