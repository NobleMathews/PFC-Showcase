import React, {useState, useEffect} from 'react'
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getAlbumName, getImgSrc } from '../helpers/album_metadata';
import { useParams } from 'react-router-dom';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
var _ = require('lodash');

const Gallery = () => {

    const [images, setImages] = useState([])
    const {id} = useParams();
    const pagename = getAlbumName(id);

    useEffect(() => {
        (async function(){
            const values = [id];
            const res = getAlbumsArrObj(values);
            const result = await res;
            const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
            setImages(images);  
        })();
    }, [id])

    return (
        <GalleryMain>
        <ParallaxProvider>
            <Jumbotron className="sticky">
                <div className="container">
                <h1 className="display-2"><b>{pagename}</b></h1>
                </div>
            </Jumbotron>
            <Parallax y={[0,0]}>
                <GalleryContainer>
                <ResponsiveMasonry
                        columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                {images.map(({data}) => (

                        <Masonry>
                        <img alt="Testing masonry packing" style={{width: "100%", display: "block"}} src={"https://picsum.photos/200/300"} />
                        {data.map((image,i)=>(
                            <img key={i} loading="lazy" alt={`${pagename}#${i}`} style={{width: "100%", display: "block"}} src={getImgSrc(image,true)} />
                        ))}
                        </Masonry>
                ))}
                </ResponsiveMasonry>
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
    }
`

const GalleryContainer = styled.div`
    background-color: #fff;
    padding: 20px;
    margin: 0;
`
const Jumbotron = styled.div`
    background: 
    linear-gradient(
    rgba(0, 0, 250, 0.25), 
    rgba(125, 250, 250, 0.45)
    )
`

export default Gallery;