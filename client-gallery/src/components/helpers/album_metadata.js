import {config} from '../../config'
var _ = require('lodash');

export const getAlbumID = (name) => {
    return config.albumIDs[`${name}`];
}

export const getAlbumName = (id) => {
    return _.findKey(obj, (item) => (item == id));
}