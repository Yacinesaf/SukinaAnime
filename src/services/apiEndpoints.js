import axios from 'axios'
// import firebaseApp from '../firebase'


const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    return res.data
  })


}
const getAnimeByName = (name) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=1&filter[text]=${name}`).then(res => {
    return res.data
  })


}
const yeet = (name) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=1&filter[text]=The God of High School`).then(res => {
    console.log(res);
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
  getAnimeByName,
  yeet
}