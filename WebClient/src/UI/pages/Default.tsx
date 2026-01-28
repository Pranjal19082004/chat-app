import { ChatSection } from "../components/ChatSection";
import { Sidebar } from "../components/Sidebar";

export function Default() {

  return (
    <div className=" w-[100vw] h-[100vh] bg-neutral-900  flex">
      <Sidebar />
      <ChatSection />
    </div>
  );
}
