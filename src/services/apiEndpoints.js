import axios from 'axios'
// import firebaseApp from '../firebase'

const getAnimes = () => {
  return axios.get('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0').then(res => {
    console.log(res)
  })
}
const getAnimesByGenra = (genre) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0?filter[categories]=${genre}`).then(res => {
    console.log(res)
  })
}
const getAnimesByDate = () => {
  return axios.get('https://kitsu.io/api/edge/anime?page[limit]=10&page[offset]=0').then(res => {
    console.log(res)
  })
}

export {
  getAnimes
}