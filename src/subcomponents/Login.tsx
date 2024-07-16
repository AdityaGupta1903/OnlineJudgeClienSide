import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name,setname] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [username,setUsername] = useState<string>("");
  const navigate = useNavigate();
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const HandleAuth = async() =>{
    
    if(username.length > 0 && password.length > 0){
       if(isLogin){
         const resp = await axios.post('https://algoforces.backend.adityagupta.tech/login',{
            username : username,
            password : password
          })
         if(resp){
            const Response = resp.data?.token
            if(Response){
                localStorage.setItem('token',Response);
                navigate('/Challanges')
            }
            else{
                alert(resp.data?.message);
            }
         }
         else{
            alert("Some Error Has Occured");
         }
       }
       else{
        const resp = await axios.post('https://algoforces.backend.adityagupta.tech/Signup',{
            username : username,
            password : password
        })
        if(resp){
            const Response = resp.data?.token
            if(Response){
                localStorage.setItem('token',Response);
                navigate('/Challanges')
            }
            else{
                alert(resp.data?.message);
            }  
        }
       }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'} to AlgoForces</h2>
       
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={name}
                onChange={(e)=>setname(e.target.value)}
              />
            </div>
          )}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className="block w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={()=>{
                HandleAuth();
              }}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
       
        <div className="text-center">
          <button
            onClick={toggleForm}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
