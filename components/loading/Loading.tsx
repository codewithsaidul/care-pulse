import PulseLoader from "react-spinners/PulseLoader";


const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <PulseLoader
        color={"#ffffff"}
        loading={true}
        size={14}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
