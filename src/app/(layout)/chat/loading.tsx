import Image from "next/image";

const Loading = () => {
  return <div className="w-full h-screen flex items-center justify-center">
    <div className="w-16 h-16 border-t-2 border-b-2 border-primary rounded-full animate-spin flex items-center justify-center">
      <Image src={"/logo.png"} alt="logo" width={100} height={100} className="" />
      </div>
  </div>;
};

export default Loading;
