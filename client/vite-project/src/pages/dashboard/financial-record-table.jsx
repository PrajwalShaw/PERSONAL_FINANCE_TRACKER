import { useFinancialRecords } from "../../context/financial-record-context"
import { useTable, Column, CellProps, Row } from "react-table";
import { useMemo,useState } from "react";

const EditableCell = ({value:initialValue,row,column,updateRecord,editable})=>{//creating a functional component to edit the cell value
    const [isEditing,setIsEditing] = useState(false);
    const [value,setValue] = useState(initialValue);
   
    //The onBlur function is an event handler designed to handle the event when an input field loses focus. In the context of an editable table cell, it is used to end the editing mode and save the new value.
     const onBlur = ()=>{
        setIsEditing(false);
        updateRecord(row.index,column.id,value);
     }


    return (
        <div onClick={()=> editable && setIsEditing(true)} style={{cursor : editable? "pointer" : "default"}}>
           {isEditing ?(
             <input value={value} onChange={(e)=> setValue(e.target.value)} autoFocus  onBlur={onBlur} style={{width:"100%"}}/>
           ):typeof value ==="string" ? (value):(value.toString())
           }
        </div>
        //autoFocus means uspe click karte hi sara focus uspe aa jayega edit karne ke liye
    )

    //This EditableCell component can be used within a table to allow specific cells to be editable. When a cell is clicked, it becomes an input field, allowing the user to change its value. When the input field loses focus, the new value is saved and the cell exits the editing mode.
}

export const FinancialRecordTable = () => {

    const {records,updateRecord,deleteRecord} = useFinancialRecords();//use the context...iss context ke andar fetchAllRecords se uss specific user ke sare records ko fetch kar raha hu

    //a helper function that updates a specific cell in the record. It takes the row index, column id, and the new value to update the record.
    const updateCellRecord = (rowIndex,columnId,value)=>{
        const id = records[rowIndex]?._id;//grab the row id
        updateRecord(id?? "" ,{...records[rowIndex],[columnId]:value});//update that specific cell
        //"id ?? "" : it could be a possibility that the id is empty"
        //"...records[rowIndex],[columnId]:value" : keep the records as it is previously ...just add the updated value
    }

    const columns = useMemo(()=>[
        {
            Header:"Description",//column name
            accessor: "description",//key to access the column
            //A custom cell component (Cell) which allows the cell to be editable if specified.
            Cell : (props) =>(
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
            ),
            
            //(props) is the parameter passed to this function, which contains information about the cell, including row data, column data, and other properties provided by react-table.

            //updateRecord={updateCellRecord}: This explicitly passes the updateCellRecord function to EditableCell via the updateRecord prop.
        },
        {
            Header:"Amount",
            accessor: "amount",
            Cell : (props) =>(
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
            ),
        },
        {
            Header:"Category",
            accessor: "category",
            Cell : (props) =>(
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
            ),
        },
        {
            Header:"Payment Method",
            accessor: "paymentMethod",
            Cell : (props) =>(
                <EditableCell {...props} updateRecord={updateCellRecord} editable={true}/>
            ), 
        },
        {
            Header:"Date",
            accessor: "date",
            Cell : (props) =>(
                <EditableCell {...props} updateRecord={updateCellRecord} editable={false}/>
            ),
        },
        {
            Header : "Delete",
            id: "delete",
            Cell : ({row})=>(
                <button onClick={() => deleteRecord(row.original._id ?? "")} className="button">
                   Delete
                </button>
            )
        }
    ],[records]);//whenever there is a change in [records] we need to redefine the column
   
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: records
    })

    return (
        <div className="table-container">
            <table {...getTableProps()} className="table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")} </th>
                            ))}

                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                                ))}
                            </tr>
                        );
                    })}


                </tbody>
            </table>
        </div>
    )
}