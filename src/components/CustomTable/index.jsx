import { useState, useMemo } from "react";
import './styles.css'


const CustomTable = ({ data, id, tableOnDrop, role,  tableOnDragEnter, tableOnDragLeave, tableOnDragOver, dragHandler }) => {
    const [ columns, setColumns ] = useState([]);

    const emptyTable = useMemo(() => {
        return (
            <>
                <thead className="thead-dark">
                    <tr><th></th><th></th></tr>
                </thead>
                <tbody>
                    <tr><td></td><td></td></tr>
                    <tr><td></td><td></td></tr>
                </tbody>
            </>
        );
    }, [ ]);

    const createColumnn = () => {
        return (
            columns.map(column => (
                <tr key={Math.random() * 0.5}>
                    <td className={`table__cell table__heading`} key={column + 1}>{ column }</td>
                    {
                        data.map((item, index) => (
                            <td className={`table__cell`} key={item[column] + Math.random() * 10}>{ item[column] }</td>
                        ))
                    }
                </tr>
            ))
        );
    };

    const onDropHandler = event => {
        event.preventDefault();
        tableOnDrop(columns, setColumns);
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
                        columns.length > 0 ? (
                            <>
                                <tbody>
                                    { createColumnn() }
                                </tbody>
                            </>
                        ) : emptyTable 
                    }
            </table>
        </div>
    );
};

export default CustomTable;
/*

            data
                .map(item => columns.map( column => item[column]))
                .map((item, position) => (
                    <tr key={Math.random() * 10} className="table__row">
                        {
                            [columns[position], ...item].map((value, index) => (
                                <td className={`table__cell ${index === 0 ? 'table__heading' : ''}`} key={value + 1}>{ value }</td>
                            ))
                        }
                    </tr>
                ))

                                <thead className="thead-dark">
                                    <tr>
                                        {
                                            columns.map(column => (
                                                <th 
                                                    key={column} 
                                                    data-key={column}
                                                    className="table__cell table__cell--heading"
                                                    >
                                                        { column }
                                                    </th>
                                                )
                                            )
                                        }
                                    </tr>
                                </thead> 
*/