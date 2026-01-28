import { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";
import { Cross } from "../../assets/Icons/cross";
import { createGroupService } from "../../services/group";
export function CreateGroup() {
  const nameRef = useRef(null);
  const [members, setMembers] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  const obj = useRef<Record<string, number>>({});
  useEffect(() => {
    api.listUserContact().then((data: { username: string; id: number }[]) => {
      data.forEach((x) => (obj.current[x.username] = x.id));
      setContacts(() => {
        return Object.keys(obj.current);
      });
    });
    return () => {
      obj.current = {};
    };
  }, []);
  function onclickHandler(val) {
    setMembers((prev) => prev.filter((x) => x != val));
  }
  function onSubmit() {
    const userIds = members.map((x) => obj.current[x]);
    if (nameRef && nameRef.current) {
      const userId = Number(localStorage.getItem("userId"));
      createGroupService(userId, nameRef.current.value, userIds);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="aspect-[1] w-[40vw] flex flex-col gap-5 shadow-amber-200 border-2 p-4 rounded-4xl ">
          <div className="text-neutral-950 text-display-default self-center font-bold">
            Create Group
          </div>
          <input
            type="email"
            className="text-body-lg px-1 border-1 rounded-xl p-2"
            ref={nameRef}
            placeholder="Name"
          />
          <div className="flex h-auto gap-4 p-1 flex-wrap">
            {members.map((x) => {
              return (
                <span
                  key={x}
                  className="p-2 flex items-center gap-2 border-2 bg-primary-700 text-primary-50 rounded-xl"
                >
                  {x}{" "}
                  <button onClick={() => onclickHandler(x)} value={x}>
                    <Cross />
                  </button>
                </span>
              );
            })}
          </div>
          <select
            onChange={(e) => {
              if (!members.includes(e.target.value)) {
                setMembers((prev) => [...prev, e.target.value]);
              }
            }}
          >
            {contacts.map((x) => {
              return <option key={obj.current[x]} value={x} label={x}></option>;
            })}
          </select>
          <button
            className="drop-shadow-sm hover:text-neutral-50 hover:bg-primary-800 rounded-4xl px-4 py-2 w-fit self-center border-primary-600 border-1"
            onClick={onSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
