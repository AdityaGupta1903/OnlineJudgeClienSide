import axios from "axios";
import IResult from "../models/IResult";

export const AllProblemsOfUsers = async()=>{
    try{
        const token = localStorage.getItem('token');
        if(token){
            const resp = await axios.get('https://algoforces.backend.adityagupta.tech/GetAllProblemStatus',{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });
            if(resp){
                let respArray :IResult[] = resp.data;
                return respArray;
            }
            else{
                return [];
            }
        }
        else{
            return [];
        }
       
    }
    catch{
        return [];
    }
}
export const QuestionArray = async() =>{
    try{
      const token = localStorage.getItem('token');
        if(token){
            const resp = await axios.get('https://algoforces.backend.adityagupta.tech/GetAllProblems',{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });
            if(resp){
                let respArray :IResult[] = resp.data;
                return respArray;
            }
            else{
                return [];
            }
        }
        else{
            return [];
        }
       
    }
    catch{
        return [];
    }
}