import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function RenderizarLivro (props) {

    const {titulo, imagem, preco, id} = props;    

    const navigate = useNavigate();

    return (
        <Border onClick={() => navigate(`/products/${id}`)}>
            <p>{titulo}</p>
            <p>{imagem}</p>
            <p>{preco}</p>
            <p>{id}</p>
        </Border>
    )

//     <Link key={id} to={`/filme/${id}`}>
//     <div className="image-border" >
//         <img className="image" src={posterURL} />
//     </div> </Link>)
// })}
// </div> */
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
}
`

export default RenderizarLivro;