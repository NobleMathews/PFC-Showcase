var express = require('express');
var router = express.Router();
const persist = require('node-persist');
const {getAlbum} = require('./helpers/getImages')

const albumCache = persist.create({
  dir: 'daily-album/',
  // need to decide on proper period curently 1 day
  ttl: 86400000,
});
albumCache.init();

router.get('/:id', async function(request, response) {
  try {
    const cachedAlbums = await albumCache.getItem(`${request.params.id}`);
    if (cachedAlbums) {
      response.json(cachedAlbums);
    } else {
      const results = await getAlbum(request.params.id)
      response.json(results);
      // res.status(200).send(results);
      albumCache.setItem(`${request.params.id}`, results);
    }
  }
  catch(e) {
    response.status(500)
    albumCache.removeItem(request.params.id);
  }
});

module.exports = router;
