import axios from 'axios'
import firebaseApp from '../firebase'
import firebase from 'firebase'
require('firebase/auth')

const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    return res.data
  })


}
const getAnimeByName = (name) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories&page[limit]=1&filter[text]=${name}`).then(res => {
    return res.data
  })


}

const newUser = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
    return res
  })
}

// const getSelectedAnimeCategorie = (categorie) => {
//   return axios.get(`https://kitsu.io/api/edge/categories/${categorie}`).then(res => {
//     return res
//   })
// }
// const getyRelatedAnimes = (categorie) => {
//   return axios.get(`https://kitsu.io/api/edge/anime?filter[categories]=${categorie}&page[limit]=4`).then(res => {
//     return res
//   })
// }


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
  newUser
}