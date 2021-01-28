import firebase from 'firebase/app'
import 'firebase/firestore';
require('firebase/auth');


const firebaseConfig = {
    apiKey: "AIzaSyCZ25MPNF1mBdsjkoKG31-6ucIPBbqINuE",
    authDomain: "factshq-42e2a.firebaseapp.com",
    projectId: "factshq-42e2a",
    storageBucket: "factshq-42e2a.appspot.com",
    messagingSenderId: "806793768934",
    appId: "1:806793768934:web:2c95580d280f853700b027",
    measurementId: "G-EW0XDNL8FV"
  };
const FirebaseApp=firebase.initializeApp(firebaseConfig);

const db=FirebaseApp.firestore();
const auth=FirebaseApp.auth();
export {db,auth};

