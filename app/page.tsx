import NavBar from "./_components/NavBar";
import ChatsPanel from "./_components/ChatsPanel";
import ChatWindow from "./_components/ChatWindow";

export default function Home() {
  return (
    <main className="flex min-h-full h-screen text-primary-50 font-sans bg-[#171717]">
      <NavBar/>
      <ChatsPanel/>
      <ChatWindow/>
    </main>
  );
}
