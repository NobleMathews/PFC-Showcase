import React, {useState, useEffect} from 'react'
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getAlbumName, getImgSrc, getImgHeight } from '../helpers/album_metadata';
import {useParams} from 'react-router-dom'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { SRLWrapper } from "simple-react-lightbox";
import Skeleton from 'react-loading-skeleton';
// import { filter } from 'lodash';
// import { Jumbotron } from 'react-bootstrap';
import HeroBanner from '../Banner';

var _ = require('lodash');
var url=[];
var numberOfImages=0;

const Gallery = () => {
    const [loading, setLoading] = useState([]);
    const [images, setImages] = useState([])
    const [heights, setHeight] = useState([])
    // url=[];
    const {id} = useParams();
    const pagename = getAlbumName(id);
    const imageLoaded = (i) => {
        let newArr = [...loading];
        newArr[i] = true;
        setLoading(newArr)
    }

    useEffect(() => {
        (async function(){            
            const values = [id];
            const res = getAlbumsArrObj(values);
            const result = await res;
            const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
            var rand;
            if(images[0].data.length>=5){
                numberOfImages=5;
                for(var i=0;i<numberOfImages;i++){
                    rand=Math.floor(Math.random()*images[0].data.length);
                    url.push(images[0].data[rand]);
                }
            }
            else{
                numberOfImages=images[0].data.length;
                for(var l=0;l<numberOfImages;l++){
                    url.push(images[0].data[l]);
                }
            }
            const heightsA = await getImgHeight(images[0].data);
            const nameArray = heightsA.map(function (el) { return el.value; });
            setHeight(nameArray);
            // url=images[0].data[rand];
            setImages(images);
        })();
    }, [id])

    return (
        
        <GalleryMain>
        <ParallaxProvider>

            {/* <div className="container-shr"> 
                <h1 className="display-2"><b>{pagename}</b></h1>
            </div>

            <Jumbotron className="sticky" style={{backgroundImage:
            `linear-gradient(
                rgba(0, 0, 0, 0.45), 
                rgba(0, 0, 0, 0.45)
                ),
                url(${url})`}}>
                   
            </Jumbotron> */}

            <HeroBanner links={url} pagename={pagename} />

            <div className="gallery-shr">
            <Parallax y={[0,0]}>
                
                <GalleryContainer>
                    <SRLWrapper 
                        options={{
                            buttons: {
                                showDownloadButton: false,
                            }
                        }}
                    >
                        <ResponsiveMasonry
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                        >
                        {images.map(({data}) => (

                                <Masonry key={heights.length} gutter={"15px"}>
                                {/* <img alt="Testing masonry packing" style={{width: "100%", display: "block"}} src={"https://picsum.photos/200/300"} /> */}
                                {data.map((image,i)=>(
                                    <div key={"skeleton"+i}>
                                    <Skeleton style={{display: loading[i] ? "none" : "block", paddingBottom: `${heights[i]*1.2}px`,width: "100%"}}/>
                                    <a href={getImgSrc(image , false)}>
                                        <img className="image" key={i} alt={`${pagename}#${i}`} style={{width: "100%", display: loading[i] ? "block" : "none"}} src={getImgSrc(image,true)} onLoad={()=>imageLoaded(i)}/>
                                    </a>
                                    </div>
                                ))}
                                </Masonry>
                        ))}
                        </ResponsiveMasonry>
                    </SRLWrapper>
                    
                </GalleryContainer>
                
            </Parallax>
            </div>
            
        </ParallaxProvider>
        </GalleryMain>
    )
}

const GalleryMain = styled.div`
    .sticky {
        position: sticky;
        top: 0;
        margin: 0;
        padding: 50px;
        height: 240px;
        width: 100%;
    }
`
const GalleryContainer = styled.div`
    background-color: var(--color-primary);
    // background-color: gray;
    padding: 20px;
    margin: 0;

    .image{
        transition: all 0.25s ease;
    }
    .image:hover{
        transform: scale(1.01);
        opacity: 0.9;
        background-color: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1));
    }
`

// const Jumbotron = styled.div`
//     background-color: white;
//     opacity: 1;
//     background-repeat: no-repeat;
//     height: 100%;
//     background-position: center;
//     background-size: cover;
//     overflow: hidden;
//     color: white;
//     font-weight: bold;
//     font-family: verdana;
//     text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black, 0px 0px 5px #232323, -1px 1px 6px #acacac;
//     // url(https://lh3.googleusercontent.com/rUxRcUW34A3AUt6BCt7LrDXqR8xPQ1Dy1T5Qr3DAjbUUufMCiH6p_ThFiuK67xekyrK8aTsTDDCzW_tGP_hhnJaty5BpbrYm0LHvFONyVt-U4o3vW0zkLAFLYIPK4YWyMO0z5YFvcA);
// `

export default Gallery;