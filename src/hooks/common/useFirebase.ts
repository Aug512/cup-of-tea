import { useContext } from 'react';
import { FirebaseContext } from 'index';

export const useFirebase = () => {
    return useContext(FirebaseContext);
}
