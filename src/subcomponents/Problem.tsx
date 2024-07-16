import { Button, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IQuestion from "../models/IQuestion";
import { useQuery } from "react-query";
import { QuestionArray } from "../api/function";

// eslint-disable-next-line react-refresh/only-export-components
const Problem: React.FC<{AllProblemofUser:any}> = ({AllProblemofUser}) => {
  const navigate = useNavigate();
  const {data:Problems} = useQuery('Problems',async()=> await QuestionArray());
  const getSolvedState = (Element : IQuestion) =>{
    let solvedState = "UnAttempted"
    if(AllProblemofUser){
      let list = AllProblemofUser;
      for(let i = 0;i<list.length;i++){
        if(list[i].ProblemId === Element.ID){
          solvedState = list[i].Virdict;
          break;
        }
      }
    }
     return solvedState;
  }
 //// Update the Solved and Unsolved State in this
 console.log(AllProblemofUser);
 
  return (
    <div>
      { Problems && Problems.map((Element :any, _key:any) => {
        let SolvedState = getSolvedState(Element);
        console.log(SolvedState)
        return (
          <div
            className="m-4 pl-4 pr-4 pt-2"
            onClick={() => {
              navigate(`/Problem/${Element?.ID}`);
            }}
          >
            <Card className="p-3" style={{ backgroundColor: "#FFFAE6" }}>
            <div className="flex justify-between">
            <div>
            {Element?.Description}
            </div>
            <div>
            </div>
              </div>             
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Problem;
