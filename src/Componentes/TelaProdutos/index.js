import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import HeaderProdutos from "../Layout/HeaderProdutos";
import RenderizarLivro from "./RenderizarLivro";

function TelaProdutos() {

    const [produtos, setProdutos] = useState([]);

    const categoria1 = "Desenvolvimento Pessoal";
    const categoria2 = "Ficção";
    const categoria3 = "Investimentos";

    const servidor = "http://localhost:5000/products";

    // Rever no live coding como usar o try catch dentro do use effect
    useEffect(() => {
        const promise = axios.get(servidor);
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
                {produtos.map(produto => {
                    const { title, image, author, id, _id, status } = produto;
                    if (status === categoria1) {
                        return (
                            <>
                                <Section>
                                    <h2>{categoria1}</h2>
                                </Section>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                    if (status === categoria2) {
                        return (
                            <>
                                <Section> 
                                    <h2>{categoria2}</h2>
                                </Section>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                    if (status === categoria3) {
                        return (
                            <>
                                <Section>
                                    <h2>{categoria3}</h2>
                                </Section>
                                <Books>
                                    <RenderizarLivro key={id} image={image}
                                        author={author} title={title} id={_id} />
                                </Books>
                            </>
                        )
                    }
                })}
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 67px;
`
const Section = styled.div`
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
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 10px;
`

export default TelaProdutos