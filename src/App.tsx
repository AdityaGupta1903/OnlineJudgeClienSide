/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Problem from "./subcomponents/Problem";
import Submission from "./subcomponents/Submission";


function App() {
  console.log("ADI");
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Problem/>}/>
       <Route path="/Problem/:id" element={<Submission/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
