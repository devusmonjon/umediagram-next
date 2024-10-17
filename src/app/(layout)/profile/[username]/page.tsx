import { getProfile } from "@/work-with-api";

const Profile = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const profile = await getProfile(username, true);

  return <div>{profile.fullName}</div>;
};

export default Profile;
