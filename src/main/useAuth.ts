import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import firebase from 'firebase/app';  // firebase.User 타입을 사용하기 위해 import 합니다.

export const useAuth = () => {
  const [user, setUser] = useState<any | null>(null);  // 타입을 firebase.User | null로 설정합니다.
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return user;
};
