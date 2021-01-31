import React, {useState, useEffect} from 'react'
import {config} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getAlbumID, getAlbumName, getImgSrc } from '../helpers/album_metadata';
import { values } from 'lodash';
import { useParams } from 'react-router-dom';
import { ParallaxProvider, Parallax, ParallaxBanner } from 'react-scroll-parallax';
var _ = require('lodash');

const Gallery = () => {
    const [images, setImages] = useState([])

    const {id} = useParams();
    const pagename = getAlbumName(id);

    // Querying everything parallely to cache on homepage
    useEffect(() => {
        (async function(){
            // const values = config.albumIDs;
            const values = [id];
            const res = getAlbumsArrObj(values);
            const result = await res;
            const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
            setImages(images);  
        })();
    }, [])

    return (
        <>
        {/* Just a placholder will need to come up with a good overall theme / style language */}
        <ParallaxProvider>
            
            
            <Jumbotron className="sticky">
                <div className="container">
                <h1 className="display-2"><b>{pagename}</b></h1>
                </div>
            </Jumbotron>
            
            <Parallax y={[0,0]}>
            <div className="cont">
            {
                <img src={getImgSrc("https://lh3.googleusercontent.com/BXvyRjK2pw-skWDRQgEtxAsxbp2KKSTVDpvd3WRlqWO0dnBb31KIc87zGkcnGztRk8xYnMmVOQAk9LUgRaFif2o98tv4GgfBfLUfFYFV3RSXiLHJnqowP2s-oO-pnq-gfL73IjM6Qg",true)} alt={"Testing out variable width"} />
            }
            {images.map(({name,data}) => (
                <>
                <h1>{pagename}</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                    {data.map(image=>(
                    <p>{image}</p>
                    ))}
                    </Masonry>
                </ResponsiveMasonry>
                
                </>
            ))}
            </div>

        {/* </ParallaxBanner> */}
        </Parallax>
        </ParallaxProvider>
        </>
    )
}

const Jumbotron = styled.div`
    background: 
    linear-gradient(
    rgba(0, 0, 250, 0.25), 
    rgba(125, 250, 250, 0.45)
    )
`

export default Gallery;