import { useState, useEffect } from "react";
import axios from "axios";
import dotenv from "dotenv";
import styled from "styled-components";
import HeaderCheckout from "./../Layout/HeaderCheckout";
import DadosComprador from "./DadosComprador";
import RenderizarEndereços from "./RenderizarEndereços";
import { useNavigate } from "react-router-dom";


function TelaCheckout() {

    dotenv.config();

    const URL_ENV = process.env.SERVER_URL || "http://localhost:5000"
    const idLS = localStorage.getItem("id");
    const tokenLS = localStorage.getItem("token");

    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const config = {
        headers: {
            "Authorization": `Bearer ${tokenLS}`,
            "id": idLS
        }
    }

    const servidorCheckout = `${URL_ENV}/checkout`;

    useEffect(() => {
        const promise = axios.get(servidorCheckout, config);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setUser(data);
        })
        promise.catch(() => console.log("deu ruim baixar as informações do usuário"));
    }, []);


    const [endereçoSelecionado, setEndereçoSelecionado] = useState(new Map());

    const [pagamentoSelecionado, setPagamentoSelecionado] = useState(new Map());

    // Estados usados nos inputs
    const [destinatario, setDestinatario] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [livros, setLivros] = useState([]);
    const [visivel, setVisivel] = useState(false);

    const formasPagamento = [
        { opção: "Cartão de crédito", icone: "card-outline", id: "1" },
        { opção: "Boleto", icone: "barcode-outline", id: "2" },
        { opção: "Cash", icone: "cash-outline", id: "3" }
    ]

    function zerarinputs() {
        setDestinatario("");
        setRua("");
        setBairro("");
        setCep("");
        setVisivel(false);
    }

    function ativarPagamento(id) {
        const jaSelecionado = pagamentoSelecionado.has(id);
        if (jaSelecionado) {
            pagamentoSelecionado.delete(id);
            setPagamentoSelecionado(new Map(pagamentoSelecionado));
        }
        else {
            pagamentoSelecionado.clear();
            setPagamentoSelecionado(new Map(pagamentoSelecionado.set(id)));
        }
    }

    const URL_ADDRESS = `${URL_ENV}/address`;

    function cadastrarEndereço(event) {
        event.preventDefault();
        const promise = axios.post(URL_ADDRESS, {
            destinatario,
            rua,
            bairro,
            cep,
            id: idLS
        });
        promise.then(response => {
            zerarinputs();
            setTimeout(() => window.location.reload(), 1000);
        })
    }

    const URL_CARRINHO = `${URL_ENV}/carrinho`;

    useEffect(() => {
        const promise = axios.get(URL_CARRINHO, config);
        promise.then((response) => {
            const { data } = response;
            console.log(data);
            setLivros(data);
        })
        promise.catch(() => console.log("deu ruim baixar os livros do carrinho"));
    }, []);

    function deletarLivro(id) {
        const servidorDelete = `http://localhost:5000/carrinho/${id}`
        const promise = axios.delete(servidorDelete)
        promise.then(response => {
            const { data } = response;
            setTimeout(() => window.location.reload(), 100);
        })
        promise.catch(() => console.log("deu ruim em deletar o endereço"));
    }

    function finalizarCompra () {
        if ([...endereçoSelecionado.keys()][0] === undefined) {
            alert ("Selecione um endereço de entrega")
        }
        else if ([...pagamentoSelecionado.keys()][0] === undefined) {
            alert ("Selecione uma forma de pagamento")
        }
        else {
            const URL_Confirmacao = `${URL_ENV}/checkout`
            const body = {
                nome: user.name,
                email: user.email,
                address: [...endereçoSelecionado.keys()][0],
                payment: [...pagamentoSelecionado.keys()][0],
                id: idLS,
            }
            console.log(body);
            const promise = axios.post(URL_Confirmacao, body);
            promise.then(response => {
                console.log(response.data);
                alert("Compra concluída com sucesso. Obrigado por escolher a nossa loja!");
                navigate("/")
            })
            promise.catch(() => console.log("deu ruim em finalizar a compra"));
        }
    }
    
    return (
        <>
            <HeaderCheckout />
            <Container>
                <DadosComprador usuario={user}/>

                <h1>Endereço de entrega</h1>
                <RenderizarEndereços endereçoSelecionado={endereçoSelecionado}
                    setEndereçoSelecionado={setEndereçoSelecionado} />

                <Address>
                    <h1>Adicionar endereço de entrega</h1>
                    <IconAdd onClick={() => setVisivel(!visivel)}>
                        <ion-icon name="add-circle"></ion-icon>
                    </IconAdd>
                </Address>
                {visivel ?
                    <form onSubmit={cadastrarEndereço}>
                        <SubContainer>
                            <h4>Insira o nome do destinatario</h4>
                            <Input type="text" placeholder="Destinatario" 
                                value={destinatario} onChange={(e) => setDestinatario(e.target.value)}
                            />
                            <h4>Insira o nome da rua</h4>
                            <Input type="text" placeholder="Rua" 
                                value={rua} onChange={(e) => setRua(e.target.value)}
                            />
                            <h4>Insira o nome do bairro</h4>
                            <Input type="text" placeholder="Bairro" required
                                value={bairro} onChange={(e) => setBairro(e.target.value)}
                            />
                            <h4>Insira o cep</h4>
                            <Input type="text" placeholder="CEP" required
                                value={cep} onChange={(e) => setCep(e.target.value)}
                            />
                            <Send type="submit">Salvar endereço</Send>
                        </SubContainer>
                    </form> :
                    <></>}

                <h1>Produtos comprados</h1>
                <SubContainer>
                    {livros.map(livro => {
                        const { title, author, image, price, _id } = livro;
                        let preço = price.replace(".", ",");
                        return (
                            <Border key={_id}>
                                <Image src={image}></Image>
                                <Description>
                                    <h4>{title}</h4>
                                    <h4>{author}</h4>
                                </Description>
                                <h3>R$ {preço}</h3>
                                <IconDelete onClick={() => deletarLivro(_id)}>
                                    <ion-icon name="close-circle"></ion-icon>
                                </IconDelete>
                            </Border>
                        )
                    })}
                </SubContainer>
                <h1>Adicionar forma de pagamento</h1>
                <PaymentSection>
                    {formasPagamento.map(pagamento => {
                        const { opção, icone, id } = pagamento
                        const checkSelecionado = pagamentoSelecionado.has(id)
                        return (
                            <Payment selecionado={checkSelecionado} onClick={() => ativarPagamento(id)}>
                                <IconPay>
                                    <ion-icon name={icone}></ion-icon>
                                </IconPay>
                                <p>{opção}</p>
                            </Payment>
                        )
                    })}
                </PaymentSection>
                <Finish onClick={() => finalizarCompra()}>Finalizar compra</Finish>
            </Container>
        </>
    )
}

function corBorda(selecionado) {
    if (selecionado) return "3px solid red";
    else return "none";
}

const Border = styled.div`
    width: 325px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 15px;
    display: flex;
    padding: 10px;
    position: relative;
    h3 {
        font-size: 15px;
        font-weight: bold;
        padding-top: 10px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`
const Description = styled.div`
    width: 100px;
    margin-right: 25px;
    background-color: red;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;

    h4 {
        font-size: 12px;
        margin-left: 10px;
        margin-bottom: 10px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`
const Image = styled.img`
    width: 60px;
    height: 90px;
`
const IconDelete = styled.button`
    font-size: 25px;
    background-color:  #fff;
    border: 0;
    color: red;
    position: absolute;
    top: 10px;
    right: 5px;
`
const Address = styled.div`
    width: 350px;
    display: flex;
    position: relative;
`
const IconAdd = styled.button`
    font-size: 25px;
    background-color: #fff;
    border: 0;
    color:  #F5980B;
    position: absolute;
    right: 0;
    top: 5px;
`
const PaymentSection = styled.div`
    display: flex;
    gap: 20px;
`
const Payment = styled.div`
    width: 150px;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: lightblue;
    border: ${(props) => corBorda(props.selecionado)};
`
const IconPay = styled.button`
    font-size: 25px;
    background-color:  #F5980B;
    border: 0;
    color: gray;
    border-radius: 5px;
`
const SubContainer = styled.div`
    width: 350px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 15px 0;
    padding-left: 10px;
    background-color: #fff;
    margin-bottom: 11px;
    position: relative;
`
const Container = styled.div`
    background-color:  #fff;
    width: 100vw;
    padding-left: 5px;
    padding-bottom: 25px;
    margin-top: 67px;
    position: relative;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    h1 {
        font-size: 20px;
        font-weight: bold;
        padding-top: 10px;
        margin-bottom: 20px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
    h2 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
    h5 {
        font-size: 15px;
        font-weight: bold;
        margin: 15px 0;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
    p {
        font-size: 15px;
        margin-bottom: 10px;
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
    }
`
const Input = styled.input`
    height: 45px;
    width: 303px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #666;
    margin-top: 5px;
    margin-bottom: 10px;  
    &::placeholder {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 15px;
        color: #dbdbdb;
        padding-left: 5px;
    }
`
const Send = styled.button`
    width: 120px;
    height: 50px;
    font-size: 12px;
    margin-top: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
`
const Finish = styled.button`
    width: 350px;
    height: 50px;
    border-radius: 10px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    background-color: #FF6C00;
    border: solid 1px #FF6C00;
    color: #fff;
    margin-top: 20px;
`
export default TelaCheckout;