import { initializeApp } from 'firebase/app'; // sets up firebase and creates a config 

import { 
    getAuth, //grabs auth
    signInWithRedirect, // different types of authentication
    signInWithPopup, // different types of authentication
    GoogleAuthProvider, // different types of authentication
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut, // helps you to sign out 
    onAuthStateChanged,
} from 'firebase/auth'; // sets up the authentication 

import {
    getFirestore, //storage i believe
    doc, //retreives documents from out database
    getDoc, //get the data from the doc
    setDoc, //set the data from the doc
    collection, 
    writeBatch,
    query, 
    getDocs
} from 'firebase/firestore'; // is a different service but very neat 

const firebaseConfig = { // this allows you to make actions CRUD actions
    apiKey: "AIzaSyANnpUhJx7jUWcbev9VoporVMp8p2qrPfQ",
    authDomain: "crown-clothing-db-951c8.firebaseapp.com", // this is the specific instance that we need to connect with 
    projectId: "crown-clothing-db-951c8", // this is the specific instance that we need to connect with 
    storageBucket: "crown-clothing-db-951c8.appspot.com",
    messagingSenderId: "821778260175",
    appId: "1:821778260175:web:b4a895b633eada1d90d7ba"
};
// connects to initailizeApp 
// this allows you to CRUD through google= it has assess to manipulate the data 
  
const firebaseApp = initializeApp(firebaseConfig); // we need this to use CRUD 

const googleProvider = new GoogleAuthProvider(); // gives you back the provider instances

googleProvider.setCustomParameters({ // tell the google auth provider how to behave
    prompt: 'select_account', // google authentication
}); // every time someone interacts with our provider we want them always force them to select an account

export const auth = getAuth(); // create the instances
export const signInWithGooglePopup = () => 
    signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => 
    signInWithRedirect(auth, googleProvider)

export const db = getFirestore(); // create the database and directly points to the database 

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef,object);
    });

    await batch.commit();
    console.log('done')
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    await Promise.reject(new Error('new error woops'))
    const querySnapshot = await getDocs(q);
   return querySnapshot.docs.map(docSnapshot => docSnapshot.data())    
}

export const createUserDocumentFromAuth = async ( // grabbing the data and storing into firebase
    userAuth, 
    additionalInformation = {display: 'matthew'}
    ) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid); // takes 3 arguments but we look for the ID which is the unique ID 

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);//grab the document with getdoc
    console.log(userSnapshot)
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback)
