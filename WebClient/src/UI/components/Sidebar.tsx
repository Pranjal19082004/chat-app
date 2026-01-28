import type { RootState } from "./../../store/store.js";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CHAT } from "../../store/actions.js";

//header
function SearchIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={"size-[2rem] w-[2em] h-[2em] mx-2" + className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  );
}

function Searchbar() {
  return (
    <div className="flex justify-start items-center text-neutral-300 tracking-tight text-[0.875rem] gap-2 rounded-3xl bg-neutral-700 grow shrink">
      <SearchIcon
        className={" flex justify-center item-center text-neutral-600  "}
      />
      <input
        type="text"
        className="text-[2em] focus:outline-0 "
        placeholder="Search"
      />
    </div>
  );
}
function MenuButton() {
  return (
    <button className="flex items-center justify-center  p-1  rounded-full text-neutral-400 hover:bg-neutral-600  mx-2 grow-0 shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-9"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </button>
  );
}

function Header() {
  return (
    <div className="flex flex-row justify-start items-center shrink-0 h-[4.5rem]">
      <MenuButton />
      <Searchbar />
    </div>
  );
}
//chat accordon
function ChatTab({
  groupName,
  groupId,
}: {
  groupName: string;
  groupId: number;
}) {
  const dispatch = useDispatch();
  function onlClickHandler(groupId: number, groupName: string) {

    dispatch(CHANGE_CHAT({ groupId, groupName }));
  }
  return (
    <div
      onClick={() => onlClickHandler(groupId, groupName)}
      className="h-[12vh] w-full hover:bg-neutral-700  py-3 rounded-2xl box-border p-2 flex justify-start gap-2"
    >
      <div className=" h-full  aspect-square  rounded-full bg-amber-300">
        {/* photo */}
      </div>
      <div>
        <div className="text-neutral-100 font-semibold text-body-lg tracking-tight line-clamp-1">
          {groupName}
        </div>
        <div className="flex justify-between items-baseline">
          <div className="text-body-default text-neutral-300  font-medium line-clamp-1 self-baseline align-baseline content-baseline">
            Repovive ckneofewoi iwefjiojewofew pofwepofkeokp p
          </div>
          <div className="bg-primary-500 rounded-2xl px-2  text-neutral-100 font-medium">
            2
          </div>
        </div>
      </div>
    </div>
  );
}
export function Sidebar() {
  const groups = useSelector((state: RootState) => state.groups);

  return (
    <div className="flex flex-col bg-neutral-800 h-[100vh] box-border w-[30vw] px-[1em] border-r-[0.2px] border-neutral-600">
      <Header />
      <div className="flex flex-col flex-nowrap scroll-auto overflow-auto no-scrollbar">
        {groups.map((x) => (
          <ChatTab
            key={x.groupId}
            groupId={x.groupId}
            groupName={x.groupName}
          />
        ))}
      </div>
    </div>
  );
}
