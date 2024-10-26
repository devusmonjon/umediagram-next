import AllUsers from "@/components/shared/all-users";
import HomePageComponent from "./page-component";

const Home = async () => {
  return (
    <>
    <section id="feed" className="px-[56px] xl:max-w-[calc(100%_-_465px)] max-w-full w-full duration-300">
      <HomePageComponent />
    </section>
    <AllUsers />
    </>
  );
};

export default Home;
