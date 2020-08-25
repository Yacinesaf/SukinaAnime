import firebase from 'firebase/app';
import 'firebase/firestore';


var firebaseConfig = {
  apiKey: "AIzaSyCX35fc-NfQiP7Yzw05k_dKbVVVYMH-ZhM",
  authDomain: "sukinaanime-5f246.firebaseapp.com",
  databaseURL: "https://sukinaanime-5f246.firebaseio.com",
  projectId: "sukinaanime-5f246",
  storageBucket: "sukinaanime-5f246.appspot.com",
  messagingSenderId: "986356766376",
  appId: "1:986356766376:web:9e24bcbc187cd9a30c949d"
};
export default firebase.initializeApp(firebaseConfig);