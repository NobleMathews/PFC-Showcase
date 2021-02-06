import {config} from '../../config'
import allSettled from 'promise.allsettled';
const _ = require('lodash');

export const getAlbumID = (name) => {
    return config.albumIDs[`${name}`];
}

export const getAlbumName = (id) => {
    return _.findKey(config.albumIDs, (item) => (item === id));
}

export const getAlbumPreview = (id_name) => {
    const val= config.albumPreviews[`${id_name}`];
    return val?val:config.albumPreviews[`${getAlbumName(id_name)}`];
}

export const getImgSrc = (url, preview=false) => {
    return `${url}${preview?config.previewWidth:config.maxWidth}`
}

export const orig_thumb_List = (list) => {
    const result = list.map((item)=>({"original":`${item}${config.maxWidth}`, "thumbnail":`${item}${config.previewWidth}`, "fullscreen":`${item}`}))
    return result;
} 

// function toDataURL(url, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function() {
//       var reader = new FileReader();
//       reader.onloadend = function() {
//         callback(reader.result);
//       }
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', url);
//     xhr.responseType = 'blob';
//     xhr.send();
//   }
  
// async function showImage(imgPath, callback) {
//     var myImage = new Image();
//     myImage.src = imgPath;
//     return myImage.onload = function() {
//         const imgHeight = this.height;
//         callback(imgHeight);
//     };
// }

export const getImgHeight = async (url, scaleWidth= parseInt(config.previewWidth.substring(2))) => {
    // const {width, height} = await probe(url);
    const result = await allSettled(
        url.map(async (id) => {
            const img = new Image();
            img.src = id+"=w10";
            await img.decode();
            const curHeight = img.height;
            const curWidth = img.width;
            const aspect = curHeight/curWidth;
            const scaleHeight = aspect*scaleWidth;
            return scaleHeight;
          })

     )
     return result;
    // const ratio = width/scaleWidth;
    // const scaleHeight = height/ratio;
    
}