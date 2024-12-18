// import Image from "next/image";
import { Button } from "./ui/button";
import Loading from "./loading/Loading";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        // <div className="flex justify-center items-center gap-4">
        //   <Image
        //     src="/assets/icons/loading.svg"
        //     alt="loading"
        //     width={24}
        //     height={24}
        //     className="animate-spin"
        //   />
        //   Loading...
        // </div>
        <Loading />
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
