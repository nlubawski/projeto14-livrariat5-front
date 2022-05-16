import { useState, useEffect, useContext} from "react";
import axios from "axios";
import UsuarioContext from "../Contextos/UsuarioContext"
import styled from "styled-components"

function RenderizarEndereços(props) {

    const {endereçoSelecionado, setEndereçoSelecionado} = props;

    // const {cliente} = useContext(UsuarioContext);

    // console.log("token por context: ",cliente)

    const tokenLS = localStorage.getItem("token");

    const idLS = localStorage.getItem("id");

    // console.log("id do cliente: ",idLS);

    // console.log("token: ",tokenLS);

    const [addresses, setAddresses] = useState([]);

    const servidorAddress = "http://localhost:5000/address";

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }

    useEffect(() => {
        const promise = axios.get(servidorAddress,config);
        promise.then((response) => {
            const { data } = response;
            setAddresses(data);
            // TIRAR DEPOIS ESSE CONSOLE
            // console.log("Deu bom a requisição dos endereços")
            // console.log(data);
        })
        promise.catch(() => console.log("deu ruim baixar as informações dos endereços"));
    }, []);


    function deletarEndereço (id) {
        console.log("Entrei na função de deletar o endereço")
        const servidorDeletar = `http://localhost:5000/address/${id}`;
        const promise = axios.delete(servidorDeletar)
        promise.then(response => {
            const {data} = response;
            console.log(data);
            setTimeout(() => window.location.reload(),1000);
        })
        promise.catch(() => console.log("deu ruim em deletar o endereço"));
    }
 
    // ATÉ AGORA, CADA CLIQUE QUE EU DOU, SE NÃO TEM O ID ELE COLOCA, E SE TEM, ELE TIRA. 
    // PRECISO FAZER COM QUE QUANDO COLOCA O ID EM UM ITEM, RETIRA O ID DOS OUTROS.
    function ativarEndereço (id) {
        console.log("Clicado com sucesso");
        const jaSelecionado = endereçoSelecionado.has(id); // Pergunta pro meu estado se ele já tem esse id, retorna true ou false
        if (jaSelecionado) { // Se eu já tinha selecionado e clicar de novo
            endereçoSelecionado.delete(id); // eu preciso tirar o id do mapa
            setEndereçoSelecionado(new Map(endereçoSelecionado)); // atualizo o mapa sem o id que acabei de clicar
            console.log("Nada acontece")
        }
        else { // Se eu estou clicando pela primeira vez
            endereçoSelecionado.clear();
            setEndereçoSelecionado(new Map(endereçoSelecionado.set(id)));
            // atualizo o mapa colocando as informações do id nele
        }
    }

     return (
        <>
           
            {addresses.map(address => {
                const { destinatario, rua, bairro, cep, _id } = address;
                const checkSelecionado = endereçoSelecionado.has(_id)
                // Meus endereços selecionados tem esse id? Lembrando que o id é iterado
                // Cada vez que clico em um dia, o estado é alterado, então o componente é novamente renderizado.
                // Ao clicar, eu atualizo meu mapa, então esse if vai achar o id no mapa
                // Ao achar o id no mapa, vai alterar a prop abaixo de selecionado para true
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
    border: ${(props) => corBorda(props.selecionado)};
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    background-color: lightgreen;
    position: relative;
    margin: 10px 0;
`

export default RenderizarEndereços