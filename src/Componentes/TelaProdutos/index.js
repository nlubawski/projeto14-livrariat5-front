import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import HeaderProdutos from "../Layout/HeaderProdutos";
import RenderizarLivro from "./RenderizarLivro";

function TelaProdutos() {

    dotenv.config();

    const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"

    const [produtos, setProdutos] = useState([]);
    const categoria1 = "Recomendados";
    const categoria2 = "Desenvolvimento Pessoal";
    const categoria3 = "Ficção";
    const categoria4 = "Investimentos";
    const URL_PRODUTOS = `${URL_ENV}/products`;

    useEffect(() => {
        const promise = axios.get(URL_PRODUTOS);
        promise.then((response) => {
            const { data } = response;
            setProdutos(data);
        })
        promise.catch(() => console.log("deu ruim"));
    }, []);

    return (
        <>
            <HeaderProdutos />
            <Container>
                <Section>
                    <h2>{categoria1}</h2>
                </Section>
                {produtos.map(produto => {
                    const { title, image, author, id, _id, status } = produto;
                    if (status === categoria1) {
                        return (
                            <>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                })}
                <>
                <Section>
                    <h2>{categoria2}</h2>
                </Section>
                {produtos.map(produto => {
                    const { title, image, author, id, _id, status } = produto;
                    if (status === categoria2) {
                        return (
                            <>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                })}
                </>
                <>
                <Section>
                    <h2>{categoria3}</h2>
                </Section>
                {produtos.map(produto => {
                    const { title, image, author, id, _id, status } = produto;
                    if (status === categoria3) {
                        return (
                            <>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                })}
                </>
                <>
                <Section>
                    <h2>{categoria4}</h2>
                </Section>
                {produtos.map(produto => {
                    const { title, image, author, id, _id, status } = produto;
                    if (status === categoria4) {
                        return (
                            <>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                })}
                </>
                
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 67px;
    width: 100%;
`
const Section = styled.div`
    width: 100%;
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
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 10px;
`

export default TelaProdutos