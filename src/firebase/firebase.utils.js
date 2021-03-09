import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCy2ZZ_DkhSEsxBKSN8rV-6y9yRZAV50ug",
    authDomain: "crwn-db-a84fa.firebaseapp.com",
    projectId: "crwn-db-a84fa",
    storageBucket: "crwn-db-a84fa.appspot.com",
    messagingSenderId: "159527195604",
    appId: "1:159527195604:web:c1b0163d9306899aadfc41",
    measurementId: "G-7TW99EJ77F"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;