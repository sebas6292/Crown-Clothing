// this is a component that exclusively store things, in this case we are storing the user

import { createContext, useState, useEffect } from 'react'; // createContext is a built in method from React

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase.utils'

//as the actual value you want to access
export const UserContext = createContext({ // the actual storage component 
    currentUser: null, // the default value is what we want to pass through and access, actual object and should be null to see if its true or false 
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => { // the actual functional component 
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser }; // the object that is being passed. Super important. 

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
           setCurrentUser(user);
        })

        return unsubscribe
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider> // wrap any other components is what provider is doing 
}
// holds the actual value!! 
