import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    updateDoc
} from 'firebase/firestore';


import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBM0ZAo2s1PYTtyQ0nDBYfnqwGW8I0XCdk",
  authDomain: "netflix-b632a.firebaseapp.com",
  projectId: "netflix-b632a",
  storageBucket: "netflix-b632a.appspot.com",
  messagingSenderId: "347860962150",
  appId: "1:347860962150:web:aa2b8a05ae8637663716a7",
  measurementId: "G-T18YVL2WH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
//document

export const addCollectionAndDocuments = async (
    collectKey,
    objectToAdd
)=>{
    const collectionRef = collection(db, collectKey);
    const batch = writeBatch(db);

    objectToAdd.forEach((obj) =>{
        const docRef = doc(collectionRef, obj.title.toLowerCase());
        batch.set(docRef, obj);
    });
 
    await batch.commit();
   
}

export const getCategoriesAndDocuments = async(collectKey)=>{
    const collectionRef = collection(db, collectKey);
    const q = query(collectionRef);

    const querySnapshot =  await getDocs(q);
    return querySnapshot.docs.map(($) =>$.data());
}
//user
export const createUserDocumentFromAuth = async(
    userAuth,
    additionalInformation = {}
) =>{
    if(!userAuth) return ;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log('UsrAuth: ', userAuth)
    const userSnapshot = await getDoc(userDocRef);
    
    if( !userSnapshot.exists())
    {
        const  {email} = userAuth;
        const createDate = new Date();
        const listOfUser = {
            like: [],
            watchList : []
        }
        try{
            await setDoc(userDocRef, {
                email,
                createDate,
                listOfUser,
                ...additionalInformation
            })
        }catch(err){
            console.log('error creating the user', err.message);
        }
    }

    return userSnapshot
}
export const signInAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const getCurrentUser = () =>{
    return new Promise((resolve, reject) =>{
        onAuthStateChanged(
            auth,
            (userAuth) =>{
                resolve(userAuth);
            },
            reject
        )
    })
}

export const updatePropertiesOfUser = async(userUid, listFilm)=>{
    if(!userUid) return;
    const userDocRef = doc(db, 'users', userUid);
    return await updateDoc(userDocRef , {
        listOfUser : {
            like : listFilm.like,
            watchList : listFilm.watchList
        }
    })

}

