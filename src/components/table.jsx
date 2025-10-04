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
    <>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Site</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Username</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Password</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              pswArray.map((item, index) => {
                return <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    <div className='flex items-center gap-1'>
                      <span className="truncate max-w-[200px]">{item.site}</span>
                      <span onClick={() => { copyText(item.site) }} className='cursor-pointer w-fit h-fit flex-shrink-0'>
                        <img className='size-6' src="/copy.svg" alt="copy" />
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <div className='flex items-center gap-1'>
                      <span className="truncate max-w-[150px]">{item.username}</span>
                      <span onClick={() => { copyText(item.username) }} className='cursor-pointer w-fit h-fit flex-shrink-0'>
                        <img className='size-6' src="/copy.svg" alt="copy" />
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <div className='flex items-center gap-1'>
                      <span>{"*".repeat(7)}</span>
                      <span onClick={() => { copyText(item.password) }} className='cursor-pointer w-fit h-fit'>
                        <img className='size-6' src="/copy.svg" alt="copy" />
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <div className='flex items-center justify-end gap-2 w-full'>
                      <span onClick={() => handleEdit(item.id)} className='cursor-pointer'>
                        <img className='size-6' src="/edit.svg" alt="edit" />
                      </span>
                      <span onClick={() => handleDelete(item.id)} className='cursor-pointer'>
                        <img className='size-5' src="/delete.svg" alt="delete" />
                      </span>
                    </div>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Hidden on desktop */}
      <div className="md:hidden space-y-4">
        {pswArray.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            {/* Site */}
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Site</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-800 break-all flex-1 mr-2">{item.site}</span>
                <span onClick={() => { copyText(item.site) }} className='cursor-pointer flex-shrink-0'>
                  <img className='size-6' src="/copy.svg" alt="copy" />
                </span>
              </div>
            </div>

            {/* Username */}
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Username</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800 break-all flex-1 mr-2">{item.username}</span>
                <span onClick={() => { copyText(item.username) }} className='cursor-pointer flex-shrink-0'>
                  <img className='size-6' src="/copy.svg" alt="copy" />
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Password</div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">{"*".repeat(7)}</span>
                <span onClick={() => { copyText(item.password) }} className='cursor-pointer flex-shrink-0'>
                  <img className='size-6' src="/copy.svg" alt="copy" />
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-200">
              <button 
                onClick={() => handleEdit(item.id)} 
                className='flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700'
              >
                <img className='size-6' src="/edit.svg" alt="edit" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(item.id)} 
                className='flex items-center gap-1 text-sm text-red-600 hover:text-red-700'
              >
                <img className='size-5' src="/delete.svg" alt="delete" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Table