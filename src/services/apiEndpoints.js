import axios from 'axios'
import firebaseApp from '../firebase'
import firebase from 'firebase'
require('firebase/auth')

const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories&page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
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

const getSelectedAnimeCategory = (category) => {
  return axios.get(`https://kitsu.io/api/edge/categories/${category}`).then(res => {
    return res.data.data.attributes.slug
  })
}

const getyRelatedAnimes = (category) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories&filter[categories]=${category}&page[limit]=6`).then(res => {
    return res
  })
}

const logout = () => {
  return firebase.auth().signOut()
}
const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
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
  getSelectedAnimeCategory,
  getyRelatedAnimes,
  logout,
  login
}