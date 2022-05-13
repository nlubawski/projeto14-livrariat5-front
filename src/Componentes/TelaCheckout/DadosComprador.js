import { useState, useEffect, useContext} from "react";
import axios from "axios";
import UsuarioContext from "./../Contextos/UsuarioContext"
import styled from "styled-components"

function DadosComprador() {

    // const {cliente} = useContext(UsuarioContext);

    // console.log("token por context: ",cliente)

    const tokenLS = localStorage.getItem("token");

    // console.log("token: ",tokenLS);

    const [user, setUser] = useState([]);

    const servidor = "http://localhost:5000/checkout";

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`
        }
    }

    useEffect(() => {
        const promise = axios.get(servidor,config);
        promise.then((response) => {
            const { data } = response;
            setUser(data);
            // TIRAR DEPOIS ESSE CONSOLE
            console.log("Deu bom a requisição")
            console.log(data);
        })
        promise.catch(() => console.log("deu ruim"));
    }, []);


    // BUSCAR OS DADOS DO USUÁRIO NO BACKEND PARA MOSTRAR NA TELA

    const endereços = [{
        destinatario: "Destinatário",
        rua: "Rua X",
        bairro: "Bairro Y",
        cep: "CEP",
        id: 0
    },
    {
        destinatario: "Destinatário2",
        rua: "Rua X",
        bairro: "Bairro Y",
        cep: "CEP",
        id: 1
    }]


    // Fazer nessa página a importação dos dados do backend

    return (
        <>
            <h1>Dados do comprador</h1>
            <h2>Nome</h2>
            <p>{user.name}</p>
            <h2>email</h2>
            <p>{user.email}</p>
            <h1>Endereço de entrega</h1>
            {endereços.map(endereço => {
                const { destinatario, rua, bairro, cep, id } = endereço
                return (
                    <>
                        <Container>
                            <h5>{destinatario}</h5>
                            <IconDelete>
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
    background-color: lightgreen;
    border: 0;
    color: gray;
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
    background-color: lightgreen;
    position: relative;
    margin: 10px 0;
`

export default DadosComprador