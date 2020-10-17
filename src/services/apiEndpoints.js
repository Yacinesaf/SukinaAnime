import axios from 'axios'
import firebaseApp from '../firebase'
import firebase from 'firebase'
require('firebase/auth')

const getAnimes = (pageNum, search) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories${search ? '&filter[text]=' + search : ''}&page[limit]=12&page[offset]=${(pageNum - 1) * 12}`).then(res => {
    let user = firebase.auth().currentUser;
    if (!user) return res.data
    return getMyFavorites().then(resp => {
      if (!resp) {
        let nonFavoritesAnimes = res.data.data.map(x => {
          return { ...x, isFavorite: false }
        })
        return { data: nonFavoritesAnimes, meta: res.data.meta }
      }
      let favoritesIds = resp.map(x => x.id)
      let animes = res.data.data.map(x => {
        let match = resp.find(element => element.id === x.id)
        const obj = { ...x, isFavorite: favoritesIds.includes(x.id) }
        if (match) obj.docId = match.docId
        return obj
      })
      return { data: animes, meta: res.data.meta }
    })
  })


}
const getAnimeByName = (name) => {
  return axios.get(`https://kitsu.io/api/edge/anime?include=categories&page[limit]=1&filter[text]=${name}`).then(res => {
    const anime = res.data.data[0]
    let user = firebase.auth().currentUser;
    if (!user) return anime
    return getMyFavorites().then(resp => {
      if (!resp) {
        return { ...anime, isFavorite: false }
      }
      let match = resp.find(element => element.id === anime.id)
      return { ...anime, isFavorite: Boolean(match), docId: match ? match.docId : null }
    })
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
  var user = firebase.auth().currentUser;
  let db = firebase.firestore(firebaseApp);
  let objWithTime = { ...obj, date: firebase.firestore.Timestamp.fromDate(new Date()), userId: user.uid }
  return db.collection("favorites").add(objWithTime)
    .then(doc => doc.id)
}
const removeFavoriteAnime = (id) => {
  let db = firebase.firestore(firebaseApp);
  return db.collection("favorites").doc(id).delete()
}

const getMyFavorites = () => {
  var user = firebase.auth().currentUser;
  let db = firebase.firestore(firebaseApp);
  return db.collection('favorites')
    .orderBy('date', 'desc')
    .where('userId', '==', user.uid)
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


export {
  getAnimes,
  getAnimeByName,
  newUser,
  getSelectedAnimeCategory,
  getyRelatedAnimes,
  logout,
  login,
  addFavoriteAnime,
  getMyFavorites,
  removeFavoriteAnime,
}