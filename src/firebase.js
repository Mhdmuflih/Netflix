import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCVEsRPJoZHjNdHWNqclA3f-IIzctudTTQ",
  authDomain: "netflix-clone-32bac.firebaseapp.com",
  projectId: "netflix-clone-32bac",
  storageBucket: "netflix-clone-32bac.appspot.com",
  messagingSenderId: "555786700640",
  appId: "1:555786700640:web:adfb2b9fd53573cc9bc005"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// userSign up function
const signup = async (name, email , password)=> {
    try {
        const responce = await createUserWithEmailAndPassword(auth , email , password);
        const user = responce.user;
        await addDoc(collection(db , "user") , {
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        })
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

// userLogin function
const login = async (email , password)=> {
    try {
        await signInWithEmailAndPassword(auth , email , password);
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

// logout function
const logout = ()=> {
    try {
        signOut(auth)
    } catch (error) {
        console.log(error.message);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

export {
    auth,
    db,
    login,
    signup,
    logout
}