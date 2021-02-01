import React, {useEffect, useState, useRef} from 'react'
import {config} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import {getAlbumPreview} from '../helpers/album_metadata';
import Container from 'react-bootstrap/Container'
import Skeleton from 'react-loading-skeleton';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const counter = useRef(0);
    const imageLoaded = () => {
      counter.current += 1;
      if (counter.current >= Object.keys(config.albumIDs).length) {
        setLoading(false);
      }
    }
    // Querying everything parallely to cache on homepage
    useEffect(() => {
        (async function(){
            const values = config.albumIDs;
            getAlbumsArrObj(values);
        })();
    }, [])

    return (
        <>       
        <Jumbotron className="jumbotron jumbotron-fluid">
            <div className="container">
            <h1 className="display-2"><b>PFC Showcase</b></h1>
            {/* <p className="lead">TagLine - Modify to a fixed dark image for it to look good </p> */}
            </div>
        </Jumbotron>
        <ContainerCustom>
        <Container fluid={true} >
          {/* <Row fluid={true} xs={1} md={2} lg={3} xl={4} noGutters={false} className={"justify-content-center"}> */}
          <FadeIn delay={100} className="justify-content-center row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">            
            {Object.keys(config.albumIDs).map((name, index)=> (
                <div className="card-deck" key={index}> 
                    <div className="card">
                    <a className="entireCard" style={{display:"block"}} href={`/gallery/${config.albumIDs[name]}`}> 
                    <div className="card-body">
                    <Skeleton style={{display: loading ? "block" : "none"}} className={"setHeight"}/>
                    <img style={{display: loading ? "none" : "block"}} className="card-img-top" src={getAlbumPreview(name)} alt={"Placeholder preview"} onLoad={imageLoaded}/>
                    <h5 className="title">{name}</h5>
                    </div>
                    </a>
                    </div>
                </div>
            ))}
          </FadeIn>
          {/* </Row> */}
        </Container>
        </ContainerCustom>
    </>
    )
}
/*Polaroid Version*/

const ContainerCustom = styled.div`
   
    // margin: 15px 15px 60px 30px;
    border-radius:10px; 
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .setHeight{
        margin: 5px 0px 15px 0px;
        width: 100%;
        padding-bottom: calc(67.67% - 20px);
    }

    .card-body{
        padding:0px 5px 0px 5px;
    }
    .card-deck{
        padding: 15px;
        // padding:5px 8px 5px 8px;
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
        // padding:20px 0px 15px 0px;
        padding: 5px 0px 15px 0px;
        border-radius:0px;
    }
    .entireCard{
        padding:10px 8px 20px 8px;
        background-color: transparent;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        transition: all 0.5s ease;
    }
    .entireCard:hover{
        // box-shadow: 10px 10px 5px grey;
        box-shadow:
        0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
        
        background-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        text-decoration: none;
        transform: scale(1.02);
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