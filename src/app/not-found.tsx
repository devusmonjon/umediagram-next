import Typhography from "@/components/ui/typography";

async function generateMetadata() {
  return {
    title: "404 - page not found | Umediagram",
  };
}

export { generateMetadata };
const NotFound = () => {
  return (
    <>
      <main className="mx-auto w-min whitespace-nowrap text-center flex items-center justify-center flex-col h-screen">
        <Typhography variant="h1-bold">404</Typhography>
        <Typhography variant="h2" className="mt-4">
          Page Not found
        </Typhography>
      </main>
    </>
  );
};

export default NotFound;
