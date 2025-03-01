import Aparts from "@/components/Aparts";
export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start my-4 max-w-screen-xl mx-auto ">
      <h1 className="text-2xl text-zinc-900 font-normal mb-5 mx-14">Tüm Apartlar</h1>
      <Aparts />
    </div>
  );
}
