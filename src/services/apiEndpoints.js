import axios from 'axios'
// import firebaseApp from '../firebase'


const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    return res.data
  })


}


// const getAnimesByGenra = (genre) => {
//   return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0?filter[categories]=${genre}`).then(res => {
//     console.log(res)
//   })
// }
// const getAnimesByDate = () => {
//   return axios.get('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0').then(res => {
//     console.log(res)
//   })
// }

export {
  getAnimes,

}