import { getFeed } from "@/work-with-api";
import LoginPageComponent from "./page-component";

// metadata
async function generateMetadata() {
  return {
    title: "Login | Umediagram",
    description: "Register the Umediagram account",
    openGraph: {
      title: "Login | Umediagram",
      description: "Register the Umediagram account",
    },
    twitter: {
      title: "Login | Umediagram",
      description: "Register the Umediagram account",
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
