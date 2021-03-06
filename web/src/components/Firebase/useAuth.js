import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
  const [user, setUser] = useState(null)
  const [firebase, setFirebase] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribe
    let customerProfileUnsubscribe

    loadFirebaseDependencies.then((app) => {
      const firebaseInstance = getFirebaseInstance(app)
      setFirebase(firebaseInstance)

      unsubscribe = firebaseInstance.auth.onAuthStateChanged((userResult) => {
        if (userResult) {
          setUser(userResult)
          // get user custom claims
          setLoading(true)
          Promise.all([
            firebaseInstance.getUserProfile({ userId: userResult.uid }),
            firebaseInstance.auth.currentUser.getIdTokenResult(true),
          ]).then((result) => {
            const customerProfileResult = result[0]
            const token = result[1]

            if (customerProfileResult.empty) {
              customerProfileUnsubscribe = firebaseInstance.db
                .collection("customerProfiles")
                .where("userId", "==", userResult.uid)
                .onSnapshot((snapshot) => {
                  const customerProfileDoc = snapshot.docs[0]
                  if (customerProfileDoc && customerProfileDoc.id) {
                    setUser({
                      ...userResult,
                      admin: token.claims.admin,
                      username: customerProfileDoc.id,
                    })
                  }

                  setLoading(false)
                })
            } else {
              const customerProfileDoc = customerProfileResult.docs[0]
              if (customerProfileDoc && customerProfileDoc.id) {
                setUser({
                  ...userResult,
                  admin: token.claims.admin,
                  username: customerProfileDoc.id,
                })
              }

              setLoading(false)
            }
          })
        } else {
          setUser(null)
        }

        setLoading(false)
      })
    })

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }

      if (customerProfileUnsubscribe) {
        customerProfileUnsubscribe()
      }
    }
  }, [])

  return { user, firebase, loading }
}

export default useAuth
