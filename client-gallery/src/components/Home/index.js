import React, {useEffect} from 'react'
import {config} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import {getAlbumPreview} from '../helpers/album_metadata';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
// var _ = require('lodash');

const Home = () => {
    // add back useState to imports from rect
    // const [images, setImages] = useState([])

    // Querying everything parallely to cache on homepage
    useEffect(() => {
        (async function(){
            const values = config.albumIDs;
            // const res = 
            getAlbumsArrObj(values);
            // const result = await res;
            // const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
            // setImages(images);  
        })();
    }, [])

    return (
        <>
        {/* Just a placholder will need to come up with a good overall theme / style language */}
       
        <Jumbotron className="jumbotron jumbotron-fluid">
            <div className="container">
            <h1 className="display-2"><b>PFC Showcase</b></h1>
            {/* <p className="lead">TagLine - Modify to a fixed dark image for it to look good </p> */}
            </div>
        </Jumbotron>
        <ContainerCustom>
        <Container fluid={true} >
          <Row fluid={true} xs={1} md={2} lg={3} xl={4} noGutters={false}>
              
            {Object.keys(config.albumIDs).map((name)=> (
            <>            
                <div class="card-deck"> 
                 
                <div fluid={true} class="card">
                <a class="entireCard" style={{display:"block"}} href={`/gallery/${config.albumIDs[name]}`}> 
                <div class="card-body">
                <img class="card-img-top" src={getAlbumPreview(name)} alt={"Placeholder preview"} />
                <h5 class="title">{name}</h5>
                {/* <a class="title" style={{display:"block"}} href={`/gallery/${config.albumIDs[name]}`}>{name}</a> */}
                </div>
                </a>
                </div>
               
                </div>
                
            </>
            ))}
    
          </Row>
        </Container>
        </ContainerCustom>
    </>
    )
}
/*Polaroid Version*/

const ContainerCustom = styled.div`
   
    margin: 15px 15px 60px 30px;
    border-radius:10px; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .card-body{
        padding:0px 5px 0px 5px;
    }
    .card-deck{
        
        padding:5px 8px 5px 8px;
        border-radius:0px; 
        background-color: transparent;
    }
    .card{
        margin: auto 16px auto 16px;
        padding:0px 0px 0px 0px;
        background-color: white;
        border-radius:0px;
    }
    .card-img-top{
        padding:20px 0px 15px 0px;
        border-radius:0px;
    }
    .entireCard{
        padding:10px 8px 20px 8px;
        background-color: transparent;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        
    }
    .entireCard:hover{
        box-shadow: 10px 10px 5px grey;
        background-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        text-decoration: none;
    }
    .title{
        font-family: 'Permanent Marker', cursive;
        text-decoration: none;
    }
`
 
/*Non-Polaroid Version*/
/* const ContainerCustom = styled.div`
    margin: 15px 15px 60px 30px;
    border-radius:10px; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .card-body{
        padding:0px 0px 0px 0px;
        margin:0px 0px 0px 0px;
    }
    .card-deck{
        padding:5px 8px 5px 8px;
        border-radius:0px; 
        background-color: transparent;
    }
    .card{
        border-style: none;
        margin: auto 16px auto 16px;
        padding:0px 0px 0px 0px;
        background-color: white;
        border-radius:0px;
    }
    .card-img-top{
        padding:0px 0px 0px 0px;
        margin:0px 0px 0px 0px;
        border-radius:5px;
    }
    .entireCard{
        padding:0px 0px 0px 0px;
        background-color: transparent;
        border-radius: 5px;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
    }
    .entireCard:hover{
        box-shadow: 10px 10px 5px grey;
        margin:0px 0px 0px 0px;
        text-decoration: none;
    }
    .title{
        text-transform: uppercase;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        padding: 15px 0px 5px 0px
    }
` */

const Jumbotron = styled.div`
    margin:15px 15px 30px 15px;
    border-radius:10px;
    background: 
    linear-gradient(
    rgba(0, 0, 250, 0.25), 
    rgba(125, 250, 250, 0.45)
    ),
    url(https://source.unsplash.com/1600x1050/?nature);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color:white !important;
    height:340px;
`
export default Home;