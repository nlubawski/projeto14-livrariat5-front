import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function RenderizarLivro (props) {

    const {title, image, author, id} = props;    

    const navigate = useNavigate();

    return (
        <Border onClick={() => navigate(`/products/${id}`)}>
            <Image src={image}></Image>
            <p>{title}</p>
            <p>{author}</p>
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
    height: 275px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 11px;
}
`

const Image = styled.img`
    width: 129px;
    height: 193px;
`

export default RenderizarLivro;