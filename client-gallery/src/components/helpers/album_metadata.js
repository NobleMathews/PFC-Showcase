import {config} from '../../config'
var _ = require('lodash');

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