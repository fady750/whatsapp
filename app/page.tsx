import NavBar from "./_components/NavBar";
import ChatWindow from "./_components/ChatWindow";
import LeftSidePanel from "@/shared/components/LeftSidePanel";

export default async function Home() {
  return (
    <main className="flex min-h-full h-screen text-primary-50 font-sans bg-[#171717]">
      <NavBar/>
      <LeftSidePanel/>
      <ChatWindow/>
    </main>
  );
}