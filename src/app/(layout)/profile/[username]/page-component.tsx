import { IGetProfileUser } from "@/work-with-api";
import Image from "next/image";

const ProfilePageComponent = ({ profile }: { profile: IGetProfileUser }) => {
  return (
    <section id="profile" className="px-[56px]">
      <Image
        src={profile.photo}
        alt={profile.fullName}
        width={500}
        height={500}
        placeholder="blur"
        blurDataURL={profile.photo} // Yoki haqiqiy blur data URL
      />
    </section>
  );
};

export default ProfilePageComponent;
