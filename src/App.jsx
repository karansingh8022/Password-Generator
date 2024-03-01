import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { useRef } from 'react';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%&(){}[]|\/?-_";

const inputbar = {
  width: "275px", 
  border: "none", 
  outline: "none", 
  height: "35px" 
}


function App() {
  const [length, setlength] = useState(5);
  const [numberAllowed, addNumbers] = useState(false);
  const [characterAllowed, addCharacter] = useState(false);
  const [password, setPassword] = useState("");
  
  
  const generatePassword = useCallback(()=>{
      let newPassword = "";
      let passwordString = alphabet;

      if(numberAllowed){
        passwordString += numbers;
      }

      if(characterAllowed){
        passwordString += symbols;
      }

      for (let i = 1; i<=length; i++) {
        const ind = Math.floor(Math.random()*passwordString.length);
        newPassword += passwordString.at(ind);
      }

      setPassword(newPassword);

  }, [length, numberAllowed, characterAllowed, setPassword])

  const passwordRef = useRef(null);

  const copyToClipboard = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);

  }

  useEffect(()=>{
      generatePassword();
  }, [length, numberAllowed, characterAllowed, setPassword]);



  return (
    <>
    
      <div className='position-fixed d-flex flex-column flex-wrap justify-content-center align-items-center rounded-5 pt-4 pb-4' style={{top: "10%", left: "15%", width: "70%", backgroundColor: "#383b43"}}>
        <h1>Password Generator</h1>
        <div className='p-2 m-2 d-flex flex-row justify-content-center align-items-center'>

          <input 
          type="text" 
          className='inputbar rounded-start-2 border-none ps-3'
          placeholder='Password'
          value={password}
          readOnly
          ref={passwordRef}
          style={inputbar}
          />

          <button className='copybutton rounded-end-2 text-light'
          onClick={copyToClipboard}
          >COPY</button>

        </div>

        <div className='d-flex flex-row justify-content-center align-items-center'>
          
          {/* length */}
          <div className='me-4 d-flex flex-row'> 
            <input 
            type="range" 
            min={5}
            max={20}
            value={length}
            className='me-1 cursor-pointer'
            onChange={(evt)=>{
              setlength(evt.target.value);
            }}
            />
            <label>Length ({length})</label>
          </div>

            {/* numbers */}
          <div className='me-4 d-flex flex-row'>
            <input 
            type="checkbox" 
            defaultChecked={false}
            className='me-1'
            onChange={()=>{
              addNumbers((prev)=>!prev);
            }}
            />
            <label>Numbers</label>
          </div>

            {/* character */}
          <div className='m-1 d-flex flex-row'>
            <input 
            type="checkbox"
            defaultChecked={false}
            className='me-1' 
            onChange={()=>{
              addCharacter((prev)=>!prev)
            }}
            />
            <label>Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;


