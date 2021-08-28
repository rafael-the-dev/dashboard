import { useState } from "react";
import ChartTable from "../ChartTable";
import './styles.css'


const CustomTable = ({ data, id, tableOnDrop, role,  tableOnDragEnter, tableOnDragLeave, tableOnDragOver, dragHandler,
    emptyTable, chartData }) => {
    const [ columns, setColumns ] = useState([]);
    const [ canIShowTableChart, setCanIShowTableChart ] = useState(false);

    const onDropHandler = event => {
        event.preventDefault();
        tableOnDrop(columns, setColumns, setCanIShowTableChart);
    };

    const deleteColumn = event => {
        const columnName = event.target.parentNode.getAttribute("data-key");
        setColumns(c => c.filter(column => column !== columnName));
    };

    const createColumnn = () => {
        return (
            columns.map(column => (
                <tr key={Math.random() * 0.5}>
                    <td 
                        className={`table__cell table__cell--heading table__heading`} 
                        data-key={column}
                        key={column + 1}>
                        { column }
                        <span 
                            className="fas fa-times text-danger table__cell--delete"
                            onClick={deleteColumn}>
                        </span>
                    </td>
                    {
                        data.map((item, index) => (
                            <td className={`table__cell`} key={item[column] + Math.random() * 10}>{ item[column] }</td>
                        ))
                    }
                </tr>
            ))
        );
    };

    return (
        <div className="table-responsive">
            <table 
                id={id}
                onDragEnter={tableOnDragEnter}
                onDragLeave={tableOnDragLeave}
                onDragOver={tableOnDragOver} 
                onDrop={onDropHandler}
                draggable="true"
                onDragStart={dragHandler}
                data-role={role}
                className="table table-hover table-bordered table-striped ">
                    {
                        canIShowTableChart ? (<ChartTable columns={chartData[0]} data={chartData.slice(1)} />) :
                            (
                                columns.length > 0 ? (
                                    <>
                                        <tbody>
                                            { createColumnn() }
                                        </tbody>
                                    </>
                                ) : emptyTable 
                            )
                    }
            </table>
        </div>
    );
};

export default CustomTable;