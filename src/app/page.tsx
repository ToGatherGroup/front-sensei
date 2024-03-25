import Injuries from "@/components/injuries/index";

export default function Home() {
  return (
   <main className="h-screen flex items-center justify-center">
      <h1 className="text-white text-[50px] font-bold">Sensei Divino</h1>
      <Injuries />
   </main>
  );
}
