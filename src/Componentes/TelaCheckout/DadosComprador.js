import { useState, useEffect } from "react";
import axios from "axios";

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