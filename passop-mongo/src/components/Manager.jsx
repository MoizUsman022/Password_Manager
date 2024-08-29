import React, { useEffect } from "react";
import { useRef, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordsArray, setpasswordsArray] = useState([]);

  const showPassword = () => {
    if (ref.current.src.includes("Icons/eye.png")) {
      passwordRef.current.type = "text";
      ref.current.src = "Icons/cross-eye.png";
    } else {
      passwordRef.current.type = "password";
      ref.current.src = "Icons/eye.png";
    }
  };

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = () => {

    setpasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordsArray, form]);
    setform({ site: "", username: "", password: "" });
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  
  };

  const editPassword = (id) => {
    console.log("Editing password with id: " + id);
    setform(passwordsArray.filter((item) => item.id === id)[0]);
    setpasswordsArray(passwordsArray.filter((item) => item.id !== id));
  };

  const deletePassword = (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (confirm) {
      console.log("Deleting paassword with id:" + id);
      setpasswordsArray(passwordsArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordsArray.filter((item) => item.id !== id))
        
      );
      toast("Password deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-2 md:mycontainer min-h-[84.7vh]">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Lock</span>
          <span className="text-green-500">Quill/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your Own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black items-center gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            name="site"
            placeholder="Enter Website URL"
            className="border-green-500 rounded-full w-full border p-4 py-1"
            type="text"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              placeholder="Enter Username"
              className="border-green-500 rounded-full border w-full p-4 text-black py-1"
              type="text"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter Password"
                className="border-green-500 rounded-full w-full border p-4 text-black py-1"
                type="password"
              />
              <span className="absolute right-[3px] top-[4px]">
                <img
                  ref={ref}
                  onClick={showPassword}
                  className="p-1 cursor-pointer"
                  width={26}
                  src="Icons/eye.png"
                ></img>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center border border-green-900 bg-green-400 gap-3 hover:bg-green-300 rounded-full px-6 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="Passwords">
          <h2 className="text-xl py-4 font-bold text-green-800">
            Your Passwords
          </h2>
          {passwordsArray.length === 0 && (
            <div className="text-center">No Passwords</div>
          )}
          {passwordsArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordsArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center border-white border py-2">
                        <div className="flex items-center justify-center">
                          <a href={item.site}>{item.site}</a>

                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "2  5px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border-white border py-2">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border border-white w-32 py-2">
                        <div className="flex items-center justify-center">
                          {item.password}
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border border-white w-32 py-2">
                        <span
                          className="cursor-pointer px-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer px-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
