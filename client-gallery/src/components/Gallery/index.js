import React, {useState, useEffect} from 'react'
import {config} from '../../config';
import {getAlbumsArrObj} from '../helpers/await_all';
import styled from 'styled-components';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { getImgSrc } from '../helpers/album_metadata';
var _ = require('lodash');

const Gallery = () => {
    const [images, setImages] = useState([])

    // Querying everything parallely to cache on homepage
    useEffect(() => {
        (async function(){
            const values = config.albumIDs;
            const res = getAlbumsArrObj(values);
            const result = await res;
            const images = _(result).filter(album => album.status === "fulfilled").map('value').value();
            setImages(images);  
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
        {
            <img src={getImgSrc("https://lh3.googleusercontent.com/BXvyRjK2pw-skWDRQgEtxAsxbp2KKSTVDpvd3WRlqWO0dnBb31KIc87zGkcnGztRk8xYnMmVOQAk9LUgRaFif2o98tv4GgfBfLUfFYFV3RSXiLHJnqowP2s-oO-pnq-gfL73IjM6Qg",true)} alt={"Testing out variable width"} />
        }
        {images.map(({name,data}) => (
            <>
             <h1>{name}</h1>
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
        </>
    )
}

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

export default Gallery;