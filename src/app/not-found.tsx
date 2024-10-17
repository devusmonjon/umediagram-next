import Sidebar from "./(layout)/sidebar";

const NotFound = () => {
  return (
    <>
      <Sidebar />
      <main className="ml-[30vw]">
        <h1>404</h1>
        <p>Page not found.</p>
      </main>
    </>
  );
};

export default NotFound;
