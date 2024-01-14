import Signin from "@/components/ui/Custom-UI/SigninForm";
import Image from "next/image";

const Page = () => {
  return (
    <main className="flex h-screen w-screen flex-col justify-center gap-4 dark:bg-darkTheme md:flex-row ">
      <div className=" flex flex-col items-center justify-center mt-50 md:-ml-32 md:-mt-50">
        <Image
          src="/trace.svg"
          width={150}
          height={150}
          alt="logo"
          className=" h-25 w-25 md:h-96 md:w-96"
        />
        {/* <h1 className="-mt-8 text-3xl font-bold md:-mt-14">Login Page</h1> */}
      </div>
      <Signin formType="signin" />
    </main>
  );
};
export default Page;
