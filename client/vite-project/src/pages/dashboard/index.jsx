import { useUser } from "@clerk/clerk-react"
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordTable } from "./financial-record-table";
import { useFinancialRecords } from "../../context/financial-record-context";
import { useMemo } from "react";
import "./financial-record.css";

export const Dashboard = ()=>{

    const {user} = useUser();//destructure karke user name nikal raha hu
    const {records} = useFinancialRecords();
    const totalMonthly = useMemo(()=>{
        let totalAmount = 0;
        records.forEach((record)=>{
            totalAmount += record.amount;
        });

        return totalAmount;
    },[records]);//whenever something will change in the records array useMemo hook will run

    return (
        <div className="dashboard-container">
            <h1>Welcome {user?.firstName}! Here are your Finances:</h1>{/**user?...we are putting '?' just in case if user is null*/}
            <FinancialRecordForm/>
            <div>Total Monthly : ${totalMonthly}</div>
            <FinancialRecordTable/>
        </div>
    )
}