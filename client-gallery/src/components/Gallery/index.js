import React, {useState, useEffect, Component} from 'react'
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getAlbumName , getImgSrc  , orig_thumb_List , getImgHeight } from '../helpers/album_metadata';
import {useParams} from 'react-router-dom'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { SRLWrapper } from "simple-react-lightbox";
import Skeleton from 'react-loading-skeleton';

var _ = require('lodash');
var url="";

const Gallery = () => {
    const [loading, setLoading] = useState([]);
    const [images, setImages] = useState([])
    const [heights, setHeight] = useState([])
    const [randlink, setRandLink] = useState("");

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
            const rand=Math.floor(Math.random()*images[0].data.length);
            const heightsA = await getImgHeight(images[0].data);
            const nameArray = heightsA.map(function (el) { return el.value; });
            setHeight(nameArray);
            setRandLink(images[0].data[rand]);
            url=images[0].data[rand];
            setImages(images);
        })();
    }, [id])

    return (
        
        <GalleryMain>
        <ParallaxProvider>
            <Jumbotron className="sticky" style={{backgroundImage: `url(${url})`}}>
                <div className="container">
                <h1 className="display-2"><b>{pagename}</b></h1>
                {/* <p>{randlink}</p> */}
                </div>
            </Jumbotron>
            <Parallax y={[0,0]}>
                <GalleryContainer>
                    <SRLWrapper>
                        <ResponsiveMasonry
                                key={heights.length}
                                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                        >
                        {images.map(({data}) => (

                                <Masonry gutter={"15px"}>
                                {/* <img alt="Testing masonry packing" style={{width: "100%", display: "block"}} src={"https://picsum.photos/200/300"} /> */}
                                {data.map((image,i)=>(
                                    <>
                                    <Skeleton key={"skeleton"+i} style={{display: loading[i] ? "none" : "block", paddingBottom: `${heights[i]*1.2}px`,width: "100%"}}/>
                                    <a href={getImgSrc(image , false)}>
                                        <img key={i} alt={`${pagename}#${i}`} style={{width: "100%", display: loading[i] ? "block" : "none"}} src={getImgSrc(image,true)} onLoad={()=>imageLoaded(i)}/>
                                    </a>
                                    </>
                                ))}
                                </Masonry>
                        ))}
                        </ResponsiveMasonry>
                    </SRLWrapper>
                </GalleryContainer>
            </Parallax>
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
    padding: 20px;
    margin: 0;
`
const Jumbotron = styled.div`
    color: white;
    background:
    linear-gradient(
        rgba(0, 0, 250, 0.25), 
        rgba(125, 250, 250, 0.45)
        );
    background-repeat: no-repeat;
    height: 100%;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    // url(https://lh3.googleusercontent.com/rUxRcUW34A3AUt6BCt7LrDXqR8xPQ1Dy1T5Qr3DAjbUUufMCiH6p_ThFiuK67xekyrK8aTsTDDCzW_tGP_hhnJaty5BpbrYm0LHvFONyVt-U4o3vW0zkLAFLYIPK4YWyMO0z5YFvcA);
`

export default Gallery;