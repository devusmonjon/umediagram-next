import Typhography from "@/components/ui/typography";
import Image from "next/image";

const ChatPage = () => {
  return <div className="w-full h-screen flex items-center justify-center flex-col gap-[30px] sticky top-0">
    <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center">
      <Image src={"/logo.png"} alt="logo" width={100} height={100} className="scale-150" />
      
    </div>
    <Typhography variant="h3">Please select the chat</Typhography>
  </div>;
};

export default ChatPage;
