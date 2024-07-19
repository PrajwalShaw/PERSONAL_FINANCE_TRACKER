//this will be our state manager...this is where all our states and functions which alter the states the will be present here

//I want to be able to access this context anywhere in my app....and not only do I want the states which will display 
//the records(information) but also the functions which will alter those records...so that anywhere in any component 
//I can just use them by using the useContext hook

import React,{useState,useEffect, createContext, useContext} from "react";
import {useUser} from "@clerk/clerk-react";


//defining the context for financial records
const FinancialRecordsContext = createContext(undefined);

//defining the provider component for financial records
export const FinancialRecordProvider = ({children}) =>{
    const [records,setRecords] = useState([]);
    const {user} = useUser();

    //fetch all the records from the server
    const fetchRecords = async()=>{
        if(!user)
            return;

        const response = await fetch(`http://localhost:3000/financial-records/getAllByUserId/${user.id}`);

        if(response.ok)
        {
            const records = await response.json();
            console.log(records);
            setRecords(records);
        }
    };

    //fetch records whenever user changes
    useEffect(()=>{
        fetchRecords();
    },[user]);

    //function to add a record
    const addRecord = async(record)=>{
        const response = await fetch("http://localhost:3000/financial-records",{
            method:"POST",
            body : JSON.stringify(record),
            headers:{
                "Content-Type" : "application/json"
            }
        });

        try{
            if(response.ok)
            {
                const newRecord = await response.json();
                setRecords((prev)=> [...prev,newRecord]);//keep the prev records as it is and add the newRecord in the records array
            }
        }
        catch(err)
        {
            console.error("Error adding record",err);
        }
    };


    //function to update an existing record
    const updateRecord = async(id,record)=>{
        const response = await fetch(`http://localhost:3000/financial-records/${id}`,{
            method: "PUT",
            body: JSON.stringify(record),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        try{
            if(response.ok)
            {
                const updatedRecord = await response.json();
                setRecords((prev)=> prev.map((record)=> (record._id === id ? updatedRecord : record)));

            }
        }
        catch(err)
        {
            console.error("Error updating record",err);
        }
    };

    //function to delete a record
    const deleteRecord = async (id) => {
        const response = await fetch(
          `http://localhost:3000/financial-records/${id}`,
          {
            method: "DELETE",
          }
        );
    
        try {
          if (response.ok) {
            const deletedRecord = await response.json();
            setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
          }
        } catch (err) {
          console.error("Error deleting record:", err);
        }
      };


      return(
        <FinancialRecordsContext.Provider value={{records,addRecord,updateRecord,deleteRecord}}>
           {children}
        </FinancialRecordsContext.Provider>
      );
};


//custom hook to use the financial records context
export const useFinancialRecords = ()=>{
    const context = useContext(FinancialRecordsContext);

    if(!context)
    {
        throw new Error("useFinancialRecords must be used within the FinancialRecordsProvider");
    }

    return context;
};