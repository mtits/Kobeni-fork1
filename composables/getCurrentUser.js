import { getAuth, onAuthStateChanged } from 'firebase/auth'

/**
 * checks if anyone is home...
 */
export const useGetCurrentUser = () => {
  //
  const currentUser = useState('currentUser')
  const auth = getAuth(firebaseApp)

  //
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser.value = user
      console.info('Currently logged in: ID', currentUser.value.uid)
    } else {
      // User is signed out
      currentUser.value = ''
      console.info('No user detected, routing to login page...')

      // route back to login route
      await navigateTo('/login')
    }
  })
}
