import React, { useState, useEffect } from "react";
import { HiClipboard, HiLogin } from "react-icons/hi";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  useState();
  const [hide, setHide] = useState(true); // Initialize hide state to true for hiding password

  const togglePasswordVisibility = () => {
    setHide(!hide); // Toggle hide state
  };
//   const [items, setitems] = useState();
  const [Passwordarray, setPasswordarray] = useState([]);

  const getpasswords = async()=>{
    let req = await fetch("http://localhost:3000")
    let passwords = await req.json();
    console.log(passwords);
    setPasswordarray(passwords);

  }

  useEffect(() => {
    getpasswords();
  }, []);


  const savePassword = async () => {
    if (form.site.length > 3 && form.userName.length > 3 && form.password.length > 3) {
      // Save the new password to the backend
      await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() })
      });
  
      // Update the state to include the new password
      setPasswordarray(prevPasswords => [...prevPasswords, { ...form, id: uuidv4() }]);
  
      // Clear the form fields
      setform({ site: "", userName: "", password: "" });
    } else {
      alert("Please fill the form");
    }
  };
  
  const deletepassword = async(id) => {
    console.log('deleteing row with id: '+id)
    let c = confirm(" do you realy want to delete it ?");
    if(c){

        setPasswordarray(Passwordarray.filter(items=>items.id!==id))
        let res =await fetch("http://localhost:3000",{method:"DELETE",headers:{"Content-Type": "application/json"},body:JSON.stringify({id})})
        // localStorage.setItem("passwords", JSON.stringify(Passwordarray.filter(items=>items.id!==id)));
    }
   
  };
  const editpassword = (id) => {
    console.log('editing row with id:'+id)
    setform({...Passwordarray.filter(i=>i.id===id)[0],id:id});
    setPasswordarray(Passwordarray.filter(items=>items.id!==id))

  };

  const [form, setform] = useState({ site: "", userName: "", password: "" });

  const handleChange = (e) => {
    console.log("everything saved");
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content);
    alert("copy to the clipborad")
  };
  
  
  return (
    <>
      <div>
        <div className="  mx-auto ">
          <div className="container ">
            <div className=" flex flex-col p-4 mx-auto">
              <h4 className="text-center text-lg font-bold font-size-70 py-4 my-2">
                PasswordManager
              </h4>
              {/* <p className="text-center py-4 ">your password manager</p> */}
              <div className="flex   flex-row ">
                <input
                  onChange={handleChange}
                  className=" rounded-full border border-green-500 mx-auto text-black p-1 px-4 max-w-6xl m-2 w-full "
                  type="text"
                  name="site"
                  id=""
                  placeholder="Enter website URL"
                  value={form.site}
                />
              </div>
              <div className="flex p-4 mx-auto flex-lg-col ">
                <input
                  onChange={handleChange}
                  className="m-2 border border-green-500  text-black p-1 px-4"
                  type="text"
                  name="userName"
                  id=""
                  placeholder="Enter User Name "
                  value={form.userName}
                />
                <div className="relative">
                  <input
                    onChange={handleChange}
                    className="m-2 border border-green-500 text-black p-1  px-4"
                    type={hide ? "password" : "text"} // Conditionally set input type
                    name="password"
                    id=""
                    placeholder="Enter Password "
                    value={form.password}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    id="pass"
                    onClick={togglePasswordVisibility}
                  >
                    {hide ? "Show" : "Hide"} {/* Toggle button text based on hide state */}
                  </span>
                </div>
              </div>
            </div>
            <div className="container flex justify-center items-center">
              <button
                onClick={savePassword}
                className="text-black flex justify-center items-center font-bold px-3 py-1 rounded-full bg-green-500 border border-green-700 hover:bg-green-300 "
              >
                <lord-icon
                  src="https://cdn.lordicon.com/jgnvfzqg.json"
                  trigger="hover"
                  // style="width:250px;height:250px"
                ></lord-icon>
                save
              </button>
            </div>
          </div>
        </div>
        <div className="inline-flex items-center justify-center w-full mt-4 pt-4">
          <hr className="w-full h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
        </div>
        <div className="password my-4 py-4 flax justify-center items-center">
          <h2 className="text-4xl font-bold item-center text-center">
            Your Passwords
          </h2>
          {Passwordarray.length === 0 && (
            <div className="my-4 py-4">
              <h2 className="text-4xl  item-center text-center">
                No password to show
              </h2>
            </div>
          )}
          {Passwordarray.length != 0 && (
            <div className="relative flex items-center justify-center overflow-x-auto shadow-md sm:rounded-lg container p-4 m-4 ">
              <table className="items-center text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Site
                    </th>
                    <th scope="col" className="px-6 py-3">
                      UserName
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Password
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                    
                  </tr>
                </thead>
                <tbody>
                  {Passwordarray.map((items, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  "
                    >
                      <td className="px-6 py-4">
                        
                          {items.site}<button  onClick={(e) => { e.preventDefault(); copyToClipboard(items.site); }}>
                          <HiClipboard />
                        </button>
                       
                      </td>
                      <td className="px-6 py-4">{items.userName} <button  className=''  onClick={(e) => { e.preventDefault(); copyToClipboard(items.userName); }}>
                          <HiClipboard />
                        </button></td>
                      <td className="px-6 py-4">{"*".repeat(items.password.length)} <button onClick={(e) => { e.preventDefault(); copyToClipboard(items.password); }}>
                          <HiClipboard />
                        </button></td>
                        <td className="px-6 py-4">
                        <button className='mx-2'  >
                    <FaEdit onClick={(e) => {editpassword(items.id)}} className="cursor-pointer text-blue-500" />
                  </button>
                  <button onClick={() => {deletepassword(items.id)}}>
                    <FaTrashAlt className="cursor-pointer text-red-500" />
                  </button>
                </td>
                        
                
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
