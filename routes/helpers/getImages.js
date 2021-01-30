const axios = require('axios');

function extractPhotos(content) {
 const links = new Set()
 const regex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g
  let match
  while (match = regex.exec(content)) {
    links.add(match[1])
  } 
  return Array.from(links)
}

async function getAlbum(id) {
  const response = await axios.get(`https://photos.app.goo.gl/${id}`)
  return extractPhotos(response.data)
}

module.exports = {
 getAlbum 
}