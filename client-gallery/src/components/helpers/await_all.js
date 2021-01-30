import allSettled from 'promise.allsettled';
// added above polyfill for ie and samsung browser
let DEV_URL = '';
if (process.env.NODE_ENV === 'development') {
 DEV_URL = 'http://localhost:3001';
}

export const getAlbums = async (albums) => {
    const result = await allSettled(
       albums.map(async (id) => {
          try {
             const response = await fetch(
                `${DEV_URL}/api/${id}`
             )
             const data = await response.json()
             return data
          } catch (err) {
             console.error(`Server data fetch failure: ${err}`)
          }
       })
    )
    return result
}

export const getAlbumsArrObj = async (named_albums) => {
   const result = await allSettled(
      Object.keys(named_albums).map(async (key) => {
      // named_albums.map(async (albums) => {
         let name = key
         let id =  named_albums[key]
         try {
            const response = await fetch(
               `${DEV_URL}/api/${id}`
            )
            const data = await response.json()
            return {name,data}
         } catch (err) {
            console.error(`Server data fetch failure: ${err}`)
         }
      })
   )
   return result
}