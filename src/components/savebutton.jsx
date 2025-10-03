import React from "react";

const Savebutton = ({onClick, loading}) => {
  return (
    <button disabled={loading} onClick={onClick} className="disabled:bg-green-300 group bg-green-400 rounded-full px-6 py-2 flex items-center justify-center gap-2 cursor-pointer">
      <lord-icon
        src="https://cdn.lordicon.com/efxgwrkc.json"
        trigger=""
        class="size-7 pointer-events-none group-hover:[pointer-events:auto]"
      ></lord-icon>
      <span className="text-sm font-semibold">Save</span>
    </button>
  );
};

export default Savebutton;
