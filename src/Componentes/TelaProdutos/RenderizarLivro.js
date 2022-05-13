import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function RenderizarLivro (props) {

    const {title, image, author, id} = props;    

    const navigate = useNavigate();

    return (
        <Border onClick={() => navigate(`/products/${id}`)}>
            <Image src={image}></Image>
            <h2>{title}</h2>
            <h3>{author}</h3>
        </Border>
    )

//     <Link key={id} to={`/filme/${id}`}>
//     <div className="image-border" >
//         <img className="image" src={h3osterURL} />
//     </div> </Link>)
// })}
// </div> */
}

const Border = styled.div`
    width: 175px;
    height: 295px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 11px;

    h2 {
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color: var(--cor-title);
        margin: 0 15px;
        margin-top: 10px;
    }


    h3 {
        font-size: 13px;
        text-align: center;
        color: var(--cor-author);
        margin-top: 10px;
    }
}
`

const Image = styled.img`
    width: 129px;
    height: 193px;
`

export default RenderizarLivro;