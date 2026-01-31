import LeftSidePanelWrapper from "@/shared/components/LeftSidePanelWrapper";
import RightSidePanelWrapper from "@/shared/components/RightSidePanelWrapper";
export default async function Home() {
  return (
    <main className="flex min-h-full w-full  h-screen text-primary-50 font-sans bg-[#171717]">
      <LeftSidePanelWrapper/>
      <RightSidePanelWrapper/>
    </main>
  );
}
