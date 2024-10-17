import LoginPageComponent from "./page-component";

// metadata
async function generateMetadata() {
  return {
    title: "Login | Snapgram",
    description: "Register the Snapgram account",
    openGraph: {
      title: "Login | Snapgram",
      description: "Register the Snapgram account",
    },
    twitter: {
      title: "Login | Snapgram",
      description: "Register the Snapgram account",
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

export { generateMetadata };
const Login = () => {
  return <LoginPageComponent />;
};

export default Login;
