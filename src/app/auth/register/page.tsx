import RegisterPageComponent from "./page-component";

// metadata
async function generateMetadata() {
  return {
    title: "Register | Snapgram",
    description: "Register the Snapgram account",
    openGraph: {
      title: "Register | Snapgram",
      description: "Register the Snapgram account",
    },
    twitter: {
      title: "Register | Snapgram",
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
const Register = () => {
  return <RegisterPageComponent />;
};

export default Register;
