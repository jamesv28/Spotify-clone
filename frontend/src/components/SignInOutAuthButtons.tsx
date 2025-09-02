import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";
const SignInOutAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();
  const signInWithGoogle = async () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-complete",
      redirectUrlComplete: "/auth-callback",
    });
  };
  if (!isLoaded) {
    return null;
  }
  return (
    <Button
      variant="secondary"
      className="w-full text-white bg-zinc-200 h-11"
      onClick={signInWithGoogle}
    >
      Continue with Google
    </Button>
  );
};

export default SignInOutAuthButtons;
