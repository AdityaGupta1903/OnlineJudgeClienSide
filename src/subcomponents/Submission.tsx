/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Editor from "./Editor";
import { useParams } from "react-router-dom";
import axios from "axios";
import IQuestionInEditor from "../models/IQuestionInEditor";
import Card from "@mui/material/Card/Card";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import IResult from "../models/IResult";
import {  Blocks } from "react-loader-spinner";

export interface IProp {
  refetchAllProblemofUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IResult[], unknown>>;
  AllProblemofUser: any;
}
function Submission(props: IProp) {
  const [ProblemDescriptionAndSign, setProblemDescriptionAndSign] =
    useState<IQuestionInEditor>();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isFirstTimeSubmission,setisFirstTimeSubmission] = useState<boolean>(true);
  const { id } = useParams();
  console.log(props.AllProblemofUser);
  useEffect(() => {
    // Fetch problem details from the server
   
    axios.get(`https://algoforces.backend.adityagupta.tech/GetProblem/${id}`).then((resp: any) => {
      setProblemDescriptionAndSign({
        Description: resp.data.Description,
        Sign: resp.data.Sign,
        args: resp.data.args,
        SampleInput: resp.data.SampleInput,
        SampleOutput: resp.data.SampleOutput,
        ID: resp.data.ID,
      });
    });
  }, [id]);

  return (
    <div className="h-screen grid" style={{ gridTemplateColumns: "40% 60%" }}>
      <div className="relative" style={{ left: "5%" }}>
        <div className="m-2 font-bold">Question :-</div>
        <div
          className="m-2 mt-6 text-3xl"
          style={{ wordWrap: "break-word", maxWidth: "90%" }}
        >
          {ProblemDescriptionAndSign?.Description ?? ""}
        </div>
        <div className="m-2 mt-4">
          Given Inputs -{" "}
          {ProblemDescriptionAndSign?.args === "Array"
            ? `An ${ProblemDescriptionAndSign.args}`
            : `A ${ProblemDescriptionAndSign?.args}`}{" "}
        </div>
        <Card className="mt-4 p-3 w-2/3 ">
          <div className="m-2">
            <div className="font-bold mb-1">Example:-</div>
            <div>Sample Input - </div>
            <div className="m-1">{ProblemDescriptionAndSign?.SampleInput}</div>
          </div>
          <div className="m-2">
            <div>Sample Output</div>
            <div className="m-1">{ProblemDescriptionAndSign?.SampleOutput}</div>
          </div>
        </Card>
        <div className="mt-2 ml-1" style={{ fontWeight: "600" }}>
          Time Limit - 1s
        </div>
        {
          <div>
            <div className="mt-10 font-bold text-xl bg-neutral-400 mr-16 pl-2 pt-1 pb-1 ">
              Last Submission Status
            </div>
            {props.AllProblemofUser &&
              props.AllProblemofUser.map((ele: any) => {
                if (ele.ProblemId === Number(id)) {
                   isFirstTimeSubmission && setisFirstTimeSubmission(false);
                  return (
                    <Card className={isLoading ? `w-fit m-3 p-3 !font-bold !text-white !bg-amber-400`:`w-fit m-3 p-3  ${ele?.Virdict === 'Accepted'?'!bg-green-600 !text-white !font-bold':'!bg-red-600 !text-white !font-bold'}`}>
                      <div className="flex justify-around items-center">
                        <div>{isLoading ? "Processing...":ele?.Virdict}</div>
                        <div>
                          <Blocks
                            height="40"
                            width="30"
                            color="#478CCF"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={isLoading === true}
                          />
                        </div>
                      </div>
                    </Card>
                  );
                }
              })}
              {
                isLoading && isFirstTimeSubmission && <Card className={ isLoading ? `w-fit m-3 p-3 !font-bold !text-white !bg-amber-400`:'!hidden'}>
                <div className="flex justify-around items-center">
                  <div>{"Processing..."}</div>
                  <div>
                    <Blocks
                      height="40"
                      width="30"
                      color="#478CCF"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      visible={isLoading === true}
                    />
                  </div>
                </div>
              </Card>
              }
          </div>
        }
      </div>
      <div className="w-full">
        <Editor
          Sign={ProblemDescriptionAndSign?.Sign ?? ""}
          args={ProblemDescriptionAndSign?.args ?? ""}
          ID={ProblemDescriptionAndSign?.ID ?? 0}
          prop={props}
          setisLoading={setisLoading}
        />
      </div>
    </div>
  );
}
export default Submission;
