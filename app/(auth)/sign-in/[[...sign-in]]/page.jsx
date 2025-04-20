
import {SignIn} from "@clerk/nextjs"

const SignInPage = () => {
  return (
    <SignIn forceRedirectUrl="/onboarding" />
  )
}

export default SignInPage
