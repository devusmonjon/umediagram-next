import { getFeed } from "@/work-with-api";
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
const Login = async () => {
  const feed = await getFeed();
  console.log(feed);

  return <LoginPageComponent />;
};

export default Login;
