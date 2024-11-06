import RegisterPageComponent from "./page-component";

// metadata
async function generateMetadata() {
  return {
    title: "Register | Umediagram",
    description: "Register the Umediagram account",
    openGraph: {
      title: "Register | Umediagram",
      description: "Register the Umediagram account",
    },
    twitter: {
      title: "Register | Umediagram",
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
const Register = () => {
  return <RegisterPageComponent />;
};

export default Register;
