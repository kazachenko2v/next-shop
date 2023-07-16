import Loader from "@/components/Loader";

const loading = () => {
  return (
    <div className="flex min-h-full w-full items-center justify-center">
      <Loader />
    </div>
  );
};

export default loading;
