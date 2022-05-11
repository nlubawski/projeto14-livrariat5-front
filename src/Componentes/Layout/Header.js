import styled from "styled-components";

function Header() {
    return (
        <Head>
            <Container>
                <h1>Header da aplicação</h1>
            </Container>
        </Head>
    )
}

const Head = styled.div`
    position: fixed;
    top: 0;
    left: 0;
`
const Container = styled.div`
    background-color: var(--cor-header);
    width: 375px;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;

    h1 {
        font-size: 34px;
        color: var(--cor-laranja);
    }
`

export default Header;