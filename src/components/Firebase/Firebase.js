import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCmQmRNNGLHGdmKPXMu6WMEXpXI2erUaZQ",
    authDomain: "react-mini-shop.firebaseapp.com",
    databaseURL: "https://react-mini-shop.firebaseio.com",
    projectId: "react-mini-shop",
    storageBucket: "react-mini-shop.appspot.com",
    messagingSenderId: "71414383773",
    appId: "1:71414383773:web:8511fc4eef8905548d4074"
};

export default firebase.initializeApp(firebaseConfig)