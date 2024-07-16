/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Problem from "./subcomponents/Problem";
import Submission from "./subcomponents/Submission";
import { AllProblemsOfUsers } from "./api/function";
import { useQuery } from "react-query";
import Login from "./subcomponents/Login";
function App() {
  const{data:AllProblemofUser,refetch : refetchAllProblemofUser} = useQuery('AllProblemofUser', async()=> await AllProblemsOfUsers());
return (
    <BrowserRouter>
    <Routes>
      <Route path="/Challanges" element={<Problem AllProblemofUser={AllProblemofUser} />}/>
       <Route path="/Problem/:id" element={<Submission refetchAllProblemofUser={refetchAllProblemofUser} AllProblemofUser={AllProblemofUser} />}/>
       <Route path='/' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
