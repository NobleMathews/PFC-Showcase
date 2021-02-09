import React, {useEffect, useState, useRef} from 'react'
import {config} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import {getAlbumPreview} from '../helpers/album_metadata';
import Container from 'react-bootstrap/Container'
import Skeleton from 'react-loading-skeleton';
import camera from '../../assets/camera.png'

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
    // https://www.npmjs.com/package/react-burger-menu
    return(
        <div>
        
        <header id="header" className="header" style={{backgroundColor:"	#181818", padding:"15px 15px 0px 15px"}}>
        <p className="hint" style={{fontSize: "3.5vw", fontFamily: "Roboto, sans-serif", textAlign: 'left', color: "#F5F5F5"}}>PHOTOGRAPHY & FILMS CLUB, IIT TIRUPATI</p>
        <Jumbotron id="home" className="jumbotron" style={{position:'relative'}}>
        {/* <div id="infoi"> */}
        <img className="img-fluid" style={{width:"100%", maxHeight:"calc(100vh - 30px)"}} src={camera} alt="alternative" />
        {/* </div> */}
        <div className="info2">
        <div className="circle red"></div>
        </div>
        <div className="infoi">
        <div className="header-content" style={{height:"100%", display: "flex", alignItems: "center"}}>
            <div className="container">
              {/* <div className="row">
                <div className="col-lg-6 col-xl-5"> */}
                {/* <div style={{width:"100%", display: "flex", alignItems: "center"}}>
                  <div className="text-container" style={{width:"100%", padding:"10px 20px"}}>
                  <p className="hint" style={{fontSize: "4vw"}}>Welcome to</p>
                  <p className="logo" style={{textAlign:"center", color: "black",fontSize: "20vw"}}>PFC</p>
                  <p className="hint" style={{fontSize: "4vw" }}>Photography & Films Club, IIT Tirupati</p>
                  </div> 
                </div> */}
                {/* </div>  */}
                {/* <div className="col-lg-6 col-xl-7">
                  <div className="image-container">
                    <div className="img-wrapper">
                      <img className="img-fluid" src={camera} alt="alternative" />
                    </div> 
                  </div> 
                </div>  */}
              {/* </div>  */}
            </div> 
          </div> 
                  </div>
          </Jumbotron> 

        </header> 
        <div style={{margin:"40px"}}>  </div>
        {/* <svg className="header-frame" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310"><defs><style dangerouslySetInnerHTML={{__html: ".cls-1{fill:#5f4def;}" }} /></defs><title>header-frame</title><path className="cls-1" d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z" /></svg> */}

         <ContainerCustom>
         <Container fluid={true} >     
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
          
        </Container>
        </ContainerCustom>

        <footer id="footer" className="footer-area pt-120">
          <div className="container">
            <div className="footer-widget pb-100">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <div className="footer-about mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.2s">
                    <a className="logo" href="/logo">
                      <img src={process.env.PUBLIC_URL +"/assets/images/logo.png"} alt="logo" />
                    </a>
                    {/* <div className="text">
                    <p className="cardc-text">Inventions and Innovations become heirs </p>
                    </div> */}
                    <ul className="social">
                      <li><a href="# "><i className="lni lni-facebook-filled" /></a></li>
                      <li><a href="# "><i className="lni lni-twitter-filled" /></a></li>
                      <li><a href="# "><i className="lni lni-instagram-filled" /></a></li>
                      <li><a href="# "><i className="lni lni-linkedin-original" /></a></li>
                    </ul>
                  </div> 
                </div>
                <div className="col-lg-4 col-md-7 col-sm-7">
 
                </div>
                <div className="col-lg-3 col-md-5 col-sm-5">
                  <div className="footer-contact mt-50 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                  <div className="cardc" style={{background:"#5f4def"}}>
                      <h3 style={{color:"white"}}>Contact</h3>
                      <p className="cardc-text">+91-</p>
                      <p className="cardc-text">pfc@iitp.ac.in</p>
                      <p className="cardc-text">Nischal K</p>
                      <div className="cardc-text">
                        <p>Indian Institute of Technology Tirupati,</p>
                        <p>Venkatagiri Road , Yerpedu Mandal,</p>
                        <p>Chittoor - 517 619,</p>
                        <p>Andhra Pradesh, India.</p>
                      </div>
                </div>
                  </div>
                </div>
              </div> 
            </div> 
            <div className="footer-copyright">
              <div className="row">
                <div className="col-lg-12">
                  <div className="copyright mx-auto" style={{textAlign: "center"}}>
                    <div className="copyright-content">
                      <p className="text">Built by <a href="# " rel="nofollow">Fantastic Four</a></p>
                    </div> 
                  </div> 
                </div>
              </div> 
            </div> 
          </div> 
        </footer>
      </div>
    )
    // return (
    //     <>       
    //     <Jumbotron className="jumbotron jumbotron-fluid">
    //         <div className="container">
    //         <h1 className="display-2"><b>PFC Showcase</b></h1>
    //         
    //         </div>
    //     </Jumbotron>
    //     <ContainerCustom>
    //     <Container fluid={true} >
    //       
    //       <FadeIn delay={100} className="justify-content-center row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">            
    //         {Object.keys(config.albumIDs).map((name, index)=> (
    //             <div className="card-deck" key={index}> 
    //                 <div className="card">
    //                 <a className="entireCard" style={{display:"block"}} href={`/gallery/${config.albumIDs[name]}`}> 
    //                 <div className="card-body">
    //                 <Skeleton style={{display: loading ? "block" : "none"}} className={"setHeight"}/>
    //                 <img style={{display: loading ? "none" : "block"}} className="card-img-top" src={getAlbumPreview(name)} alt={"Placeholder preview"} onLoad={imageLoaded}/>
    //                 <h5 className="title">{name}</h5>
    //                 </div>
    //                 </a>
    //                 </div>
    //             </div>
    //         ))}
    //       </FadeIn>
    //       
    //     </Container>
    //     </ContainerCustom>
    // </>
    // )
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
        background-color: transparent;
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
        background-color: 	#F5F5F5;
        border-radius:0px;
        color: black;
    }
    .card:hover{
        transition: all 0.5s ease;
        background-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
        color: black;
        transform: scale(1.02);
        background-color: white;
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
        transition: all 0.5s ease;
        background-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));;
        color: black;
        text-align: center;
        margin:0px 0px 0px 0px;
        text-decoration: none;
        transform: scale(1.01);
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
    // margin:15px 15px 30px 15px;
    padding:0px !important;
    margin: 0px !important;
    // border-radius:10px;
    background: 
    linear-gradient(
    rgba(0, 0, 250, 0.25), 
    rgba(125, 250, 250, 0.45)
    ),
    url(https://source.unsplash.com/1600x1050/?nature);
    background-repeat: no-repeat;
    background-attachment: fixed;
    color:white !important;
    max-height:calc(100vh - 30px);
`
export default Home;