import { getAuth, onAuthStateChanged } from 'firebase/auth'

/**
 * checks if anyone is home...
 */
export const useGetCurrentUser = () => {
  //
  const currentUser = useState('currentUser')
  const router = useRouter()
  const auth = getAuth(firebaseApp)

  //
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user
      console.info('Currently logged in: ID', currentUser.value.uid)
    } else {
      // User is signed out
      currentUser.value = ''
      console.info('No user detected, routing to login page...')

      // setTimeout(() => {
      //   router.push('/login')
      // }, 500)

      // route back to login route
      router.push({ path: '/login' })
    }
  })
}
