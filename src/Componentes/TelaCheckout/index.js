import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import HeaderCheckout from "./../Layout/HeaderCheckout"
import DadosComprador from "./DadosComprador";

function TelaCheckout() {

    const [destinatario, setDestinatario] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");

    const [visivel, setVisivel] = useState(false);
    const [cartao, setCartao] = useState(false);
    const [boleto, setBoleto] = useState(false);

    function ativarCartao() {
        setCartao(true);
        setBoleto(false);
    }

    function ativarBoleto() {
        setCartao(false);
        setBoleto(true);
    }

    function zerarinputs() {
        setDestinatario("");
        setRua("");
        setBairro("");
        setCep("");
        setVisivel(false);
    }

    const URL = "http://localhost:5000/address";

    function cadastrarEndereço(event) {
        event.preventDefault();
        const promise = axios.post(URL, {
            destinatario,
            rua,
            bairro,
            cep
        });
        promise.then(response => {
            const { data } = response;
            // console.log(response);
            zerarinputs();
        })
    }
   
    return (
        <>
            <HeaderCheckout />
            <Container>
                <DadosComprador />
                <Address>
                    <h1>Adicionar endereço de entrega</h1>
                    <IconDelete onClick={() => setVisivel(!visivel)}>
                        <ion-icon name="add-circle"></ion-icon>
                    </IconDelete>
                </Address>
                {visivel ?
                <form onSubmit={cadastrarEndereço}>
                    <SubContainer>
                        <h4>Insira o nome do destinatario</h4>
                        <Input type="text" placeholder="Destinatario" required
                            value={destinatario} onChange={(e) => setDestinatario(e.target.value)}
                        />
                        <h4>Insira o nome da rua</h4>
                        <Input type="text" placeholder="Rua" required
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
                    "não mostrar"}

                <h1>Adicionar forma de pagamento</h1>
                <PaymentSection>
                    <CreditCard cartao={cartao} onClick={() => ativarCartao()}>
                        <IconPay>
                            <ion-icon name="card-outline"></ion-icon>
                        </IconPay>
                        <p>Cartão de crédito</p>
                    </CreditCard>
                    <BarCode boleto={boleto} onClick={() => ativarBoleto()}>
                        <IconPay>
                            <ion-icon name="barcode-outline"></ion-icon>
                        </IconPay>
                        <p>Boleto</p>
                    </BarCode>
                </PaymentSection>
            </Container>
        </>
    )
}

function bordaCartao(selecionado) {
    if (selecionado) return "5px solid red"
    else return "0"
}

function bordaBoleto(selecionado) {
    if (selecionado) return "5px solid red"
    else return "0"
}

const Address = styled.div`
    width: 350px;
    display: flex;
    position: relative;
`

const IconDelete = styled.button`
    font-size: 25px;
    background-color: yellow;
    border: 0;
    color: gray;
    position: absolute;
    right: 0;
    top: 5px;
`
const PaymentSection = styled.div`
    display: flex;
    gap: 20px;
`
const CreditCard = styled.div`
    width: 150px;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: lightblue;
    border: ${(props) => bordaCartao(props.cartao)}
`

const BarCode = styled.div`
    width: 150px;
    height: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background-color: lightblue;
    border: ${(props) => bordaBoleto(props.boleto)}
`
const IconPay = styled.button`
    font-size: 25px;
    background-color: lightgreen;
    border: 0;
    color: gray;
`

const SubContainer = styled.div`
    width: 350px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    padding: 15px 0;
    padding-left: 10px;
    background-color: lightgreen;
    margin-bottom: 11px;
    position: relative;
`

const Container = styled.div`
    background-color: yellow;
    width: 375px;
    padding-left: 5px;
    padding-bottom: 25px;
    margin-top: 75px;
    position: relative;

    h1 {
        font-size: 20px;
        font-weight: bold;
        padding-top: 10px;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 3px;
    }

    h5 {
        font-size: 15px;
        font-weight: bold;
        margin: 15px 0;
    }

    p {
        font-size: 15px;
        margin-bottom: 10px;
    }
`
const Input = styled.input`
  height: 45px;
  width: 303px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  font-family: "Lexend Deca", sans-serif;
  font-weight: 400;
  font-size: 20px;
  color: #666;
  margin-top: 5px;
  margin-bottom: 10px;  
  &::placeholder {
    font-family: "Lexend Deca", sans-serif;
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
`

// display: flex;
// justify-content: center;
// align-items: center;

export default TelaCheckout;