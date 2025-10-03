import React from 'react'
import { useRef, useState, useEffect } from 'react'
import Savebutton from './saveButton'
import Table from './table'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

const Manager = () => {
    const [loading, setloading] = useState(false)

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [pswArray, setpswArray] = useState([])


    const getPasswords = async () => {
        try {
            let req = await fetch('/api')
            let password = await req.json()
            setpswArray(password)
        } catch (err) {
            toast.error("Failed to fetch passwords")
        }
    }

    useEffect(() => {
        getPasswords()
    }, []);

    const handleSave = async () => {
        if (form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            setloading(true)
            try {

                const newId = form.id || uuidv4();

                if (form.id) {
                    await fetch("/api", {
                         method: "DELETE",
                         headers: { "Content-Type": "application/json" },
                         body: JSON.stringify({ id: form.id })
                        })
                }
                await fetch("/api", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...form, id: uuidv4() })
                 })

                 await getPasswords()

                // setpswArray([...pswArray, { ...form, id: uuidv4() }])
                setform({ site: "", username: "", password: "" })
                toast.success('Saved', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setloading(false)
            } catch (err) {
                toast.error(`Cannot be saved: ${err}`)
            }
        }
        else {
            toast.error('Fields cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const showPassword = () => {
        if (ref.current.src.includes("http://localhost:5173/public/hide.png")) {
            ref.current.src = "../public/show.png"
            passwordRef.current.type = "password"
        }

        else {
            ref.current.src = "../public/hide.png"
            passwordRef.current.type = "text"
        }
    }

    return (
        <div className="container w-[65%] h-screen mx-auto pt-10">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="input w-full">
                <div className="heading w-full flex flex-col justify-center items-center h-fit">
                    <h1 className='font-bold text-3xl cursor-pointer'><span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span></h1>
                    <p className='text-gray-500 text-sm'>Your own Password Manager</p>
                </div>
                <div className="inputs flex flex-col items-center gap-6 mt-5">
                    <input name="site" value={form.site} onChange={handleChange} type="text" className='border border-green-300 w-full rounded-full px-2 py-1 outline-none text-gray-700 text-sm' placeholder='Enter website URL' />
                    <div className=' w-full flex gap-3'>
                        <input name="username" value={form.username} onChange={handleChange} type="text" className='border border-green-300 w-3/4 rounded-full px-2 py-1 outline-none text-gray-700 text-sm' placeholder='Enter username' />
                        <div className='w-1/4 relative'>
                            <input ref={passwordRef} name="password" value={form.password} onChange={handleChange} type="password" className='border border-green-300 w-full rounded-full px-2 py-1 outline-none text-gray-700 text-sm pr-8' placeholder='Enter password' />

                            <div onClick={() => showPassword()} className='absolute top-0 right-0 h-full flex items-center mr-2 cursor-pointer'>
                                <img ref={ref} className='size-5' src="../public/show.png" alt="" />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="save flex justify-center items-center mt-5">
                    <Savebutton loading={loading} onClick={handleSave} />
                </div>
            </div>

            <div className="passwords">
                <div className="heading">
                    <h1 className='font-bold text-xl text-gray-600 border-b border-gray-300 mb-5 mt-5'>Your Passwords</h1>
                </div>
                <div className="table w-full">
                    {pswArray.length === 0 && <div className='text-[14px] text-gray-700'>No passwords to show</div>}
                    {pswArray.length !== 0 && <Table pswArray={pswArray} setpswArray={setpswArray} setform={setform} form={form} />}
                </div>
            </div>

        </div>
    )
}

export default Manager
