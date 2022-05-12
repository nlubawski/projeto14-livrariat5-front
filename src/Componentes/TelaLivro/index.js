import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function TelaLivro() {

    const { livroId } = useParams();

    const [livro, setLivro] = useState([]);

    console.log(livroId)

    const servidor = `http://localhost:5000/products/${livroId}`

    useEffect(() => {
        const promise = axios.get(servidor);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setLivro(data);
        })
        promise.catch(() => console.log("deu ruim"));
    }, []);

    return (
        <>
            <p>Sou as informações de um livro</p>
            <Border>
                <p>{livro.titulo}</p>
                <p>{livro.imagem}</p>
                <p>{livro.preco}</p>
            </Border>
        </>
    )
}

const Border = styled.div`
    width: 145px;
    height: 209px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 11px;
`
export default TelaLivro;