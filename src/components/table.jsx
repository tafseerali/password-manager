import React from 'react'
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const Table = ({ pswArray, setpswArray, setform }) => {

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          });
          if (res.ok) {
            setpswArray(pswArray.filter(item => item.id != id))
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          } else{
            Swal.fire("Error!", "Failed to delete from server", "error")
          }
        } catch(err){
            Swal.fire("Error", "Error! Server not responding", "error")
        }
      }
      else{
        Swal.fire("Canceled", "Your password is safe", "info")
      }
    })
  }


  const handleEdit = (id) => {
    setform(pswArray.filter(item => item.id === id)[0])
    setpswArray(pswArray.filter(item => item.id != id))
  }

  const copyText = (text) => {
    toast.success('Copied', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }
  
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" className="px-3 md:px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Site</th>
            <th scope="col" className="px-3 md:px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Username</th>
            <th scope="col" className="px-3 md:px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Password</th>
            <th scope="col" className="px-3 md:px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {
            pswArray.map((item, index) => {
              return <tr key={index}>
                <td className="px-3 md:px-6 py-4 text-sm font-medium text-gray-800">
                  <div className='flex items-center gap-1'>
                    <span className="truncate max-w-[120px] md:max-w-[200px]">{item.site}</span>
                    <span onClick={() => { copyText(item.site) }} className='cursor-pointer w-fit h-fit flex-shrink-0'>
                      <img className='size-5 md:size-6' src="/copy.svg" alt="copy" />
                    </span>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-4 text-sm text-gray-800">
                  <div className='flex items-center gap-1'>
                    <span className="truncate max-w-[100px] md:max-w-[150px]">{item.username}</span>
                    <span onClick={() => { copyText(item.username) }} className='cursor-pointer w-fit h-fit flex-shrink-0'>
                      <img className='size-5 md:size-6' src="/copy.svg" alt="copy" />
                    </span>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <div className='flex items-center gap-1'>
                    <span>{"*".repeat(7)}</span>
                    <span onClick={() => { copyText(item.password) }} className='cursor-pointer w-fit h-fit'>
                      <img className='size-5 md:size-6' src="/copy.svg" alt="copy" />
                    </span>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                  <div className='flex items-center justify-end gap-2 w-full'>
                    <span onClick={() => handleEdit(item.id)} className='cursor-pointer'>
                      <img className='size-5 md:size-6' src="/edit.svg" alt="edit" />
                    </span>
                    <span onClick={() => handleDelete(item.id)} className='cursor-pointer'>
                      <img className='size-4 md:size-5' src="/delete.svg" alt="delete" />
                    </span>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table