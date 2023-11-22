import UserTable from "./UserTable";

const Dashboard = () => {
  return (
    <>
      <h2>Welcome Ahmed</h2>
      <div className="px-5 sm:mx-auto sm:max-w-4xl xl:max-w-6xl">
        <UserTable />
      </div>
    </>
  );
};

export default Dashboard;
