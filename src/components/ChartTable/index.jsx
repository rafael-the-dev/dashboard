import { useEffect, useState } from "react";


const ChartTable = ({ columns, data, setCanIShowTableChart }) => {
    const [ innerColumns, setInnerColumns ] = useState([]);

    const deleteColumn = event => {
        const columnName = event.target.parentNode.getAttribute("data-key");
        setInnerColumns(c => {
            const result = c.filter(column => column !== columnName);
            if(result.length === 0) {
                setCanIShowTableChart(false);
            }
            return result;
            
        });
    };
    const arrayToObject = () => {
        const result = 
            data
                .map(item => {
                    let arr = (columns.map((column, index) => { let key = {}; key[column] = item[index]; return key;}))
                    let obj = {};
                    Object.assign(obj, ...arr);
                    return obj;
                }
                
                );
        return result;
    };

    useEffect(() => setInnerColumns(columns), [ columns ]);
    return (
        <>
            <thead className="thead-dark">
                <tr>
                    {
                        innerColumns?.map(column => (
                            <th 
                                key={Math.random() * 56} 
                                data-key={column}
                                className="table__cell table__cell--heading">
                                { column }
                                <span 
                                    className="fas fa-times text-danger table__cell--delete"
                                    onClick={deleteColumn}>
                                </span>
                            </th>
                            )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    arrayToObject()
                        ?.map(item => innerColumns.map( column => item[column]))
                        .map(row => (
                            <tr key={Math.random() * 120}>
                                {
                                    row.map(( column, index) => (
                                        <td 
                                            key={Math.random() * 32}>
                                            { index !== 0 ? column?.toFixed(2) : column }
                                        </td>)
                                    )
                                }
                            </tr>
                        ))
                }
            </tbody>
        </>
    );
};

export default ChartTable;