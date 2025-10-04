import React from "react";

const Savebutton = ({ onClick, loading }) => {
  return (
    <button disabled={loading} onClick={onClick} className="disabled:bg-green-300 group bg-green-400 rounded-full px-6 max-six:px-4 py-2 flex items-center justify-center gap-2 cursor-pointer">

      {loading ? (
        <>
          {/* Spinner Loader */}
          <svg className="animate-spin size-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" ></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path></svg>
          {/* <span className="text-sm font-semibold">Save</span> */}
        </>
      ):(
        <>
      <lord-icon
        src="https://cdn.lordicon.com/efxgwrkc.json"
        trigger=""
        className="size-6 pointer-events-none group-hover:[pointer-events:auto]"
      ></lord-icon>
        </>
      )}
      <span className="text-sm font-semibold">Save</span>
    </button>
  );
};

export default Savebutton;
