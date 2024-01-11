import Image from "next/image";

export default function Loading() {
  return (
    <div className=" flex h-screen w-screen flex-col items-center justify-center gap-8 overflow-hidden dark:bg-darkTheme">
      <Image
        src="/trace.svg"
        width={300}
        height={300}
        alt="logo"
        className=" animate-pulse"
      />
      <h1 className=" text-3xl font-bold">LMS MTs Assyairiyah Attahiriyah</h1>
    </div>
  );
}
