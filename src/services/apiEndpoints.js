import axios from 'axios'
import firebaseApp from '../firebase'
import firebase from 'firebase'
require('firebase/auth')

const getAnimes = (pageNum) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories&page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    let user = firebase.auth().currentUser;
    // if (!user) return res.data
    return getMyFavorites().then(resp => {
      if (!resp) {
        let nonFavoritesAnimes = res.data.data.map(x => {
          return { ...x, isFavorite: false }
        })
        return { data: nonFavoritesAnimes, meta: res.data.meta }
      }
      let favoritesIds = resp.map(x => x.id)
      let animes = res.data.data.map(x => {
        return { ...x, isFavorite: favoritesIds.includes(x.id) }
      })
      return { data: animes, meta: res.data.meta }
    })
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

const addFavoriteAnime = (obj) => {
  let db = firebase.firestore(firebaseApp);
  let objWithTime = { ...obj, date: firebase.firestore.Timestamp.fromDate(new Date()) }
  return db.collection("favorites").add(objWithTime)
    .then(function (doc) {
      return { ...obj, id: doc.id }
    })
}

const getMyFavorites = () => {
  var user = firebase.auth().currentUser;
  let db = firebase.firestore(firebaseApp);
  // return db.collection('favorites').where('userId', '==', user.uid)
  return db.collection('favorites')
    .get()
    .then(function (querySnapshot) {
      let favorites = querySnapshot.docs.map(doc => {
        let obj = doc.data();
        obj['docId'] = doc.id
        return obj
      })
      return favorites
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
  getSelectedAnimeCategory,
  getyRelatedAnimes,
  logout,
  login,
  addFavoriteAnime,
  getMyFavorites
}