import axios from 'axios'
import firebaseApp from '../firebase'
import firebase from 'firebase'
require('firebase/auth')

const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=genres&page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    return res.data
  })


}
const getAnimeByName = (name) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=genres&page[limit]=1&filter[text]=${name}`).then(res => {
    return res.data
  })


}

const newUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
    return res
  })
}

const getSelectedAnimeGenre = (genre) => {
  return axios.get(`https://kitsu.io/api/edge/genres/${genre}`).then(res => {
    return res.data.data.attributes.name
  })
}

const getyRelatedAnimes = (genre) => {
  return axios.get(`https://kitsu.io/api/edge/anime?filter[genres]=${genre}&page[limit]=4`).then(res => {
    return res
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
  newUser,
  getSelectedAnimeGenre,
  getyRelatedAnimes
}