/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Button from "@mui/material/Button";
import { useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { IProp } from "./Submission";

const Editor: React.FC<{ Sign: string; args: String; ID: number,prop:IProp,setisLoading:React.Dispatch<React.SetStateAction<boolean>>}> = (
  props
) => {
  const DefaultString = `function ${props.Sign}( arg1 ){

 // Write Your Code Here
   
};`;
  const [Value, setValue] = useState<string>(DefaultString);
  const handleEditorChange = (e: any) => {
    setValue(e);
  };
  const HandleSubmit = () => {
    const token = localStorage.getItem("token");
    if(token){
      console.log(token);
      props.setisLoading(true);
    fetch("https://algoforces.backend.adityagupta.tech/SubmitProblem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization" : `Bearer ${token}`
      },
      body: JSON.stringify({
        Signature: props.Sign,
        code: Value,
        args: props.Sign,
        id: props.ID,
      }),
    }).then((resp) => {
      console.log(resp);
    });
    console.log("Send the refetch call on Submission")
   setTimeout(()=>{
    props.setisLoading(false);
   },12000)
    
   setTimeout(props.prop.refetchAllProblemofUser,12000);
    }
    else{
       console.log("Error Submitting the Problem")
    }
  };

  return (
    <div>
      {" "}
      <MonacoEditor
        height="70vh"
        width={`100%`}
        language={"javascript"}
        value={DefaultString}
        theme="vs-dark"
        onChange={(e) => handleEditorChange(e)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "7%",
          marginTop: "1%",
        }}
      >
        <Button
          variant="contained"
          style={{ background: "#455A64" }}
          onClick={() => {
           HandleSubmit();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Editor;
