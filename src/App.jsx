import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwdRef = useRef(null);

  const passwdGenerator = useCallback(() => {
    let passwd = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "`~!@#$%^&*()_|[]{}<>?/";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      passwd += str.charAt(char);
    }
    setPassword(passwd);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswdToClipboard = () => {
    passwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    passwdGenerator();
  }, [length, numAllowed, charAllowed, passwdGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg my-8 px-4 py-8 text-white bg-gray-700">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden  mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black"
            placeholder="password"
            readOnly
            ref={passwdRef}
          />
          <button
            className="outline-none text-white px-3 py-0.5 shrink-0 bg-blue-500"
            onClick={copyPasswdToClipboard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              max={20}
              min={6}
              value={length}
              className="cursor-pointer"
              id="len"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="len">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
