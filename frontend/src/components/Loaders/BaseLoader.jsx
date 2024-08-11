import GridLoader from "react-spinners/GridLoader";

const BaseLoader = () => {
  const loading = true;
  const color = "#22331D";
  return (
    <div className="h-screen w-full flex justify-center items-center bg-white">
      <GridLoader
        color={color}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default BaseLoader;
