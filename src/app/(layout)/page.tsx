import { API_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Link href="/auth/login">Login</Link>
    </div>
  );
};

export default Home;
