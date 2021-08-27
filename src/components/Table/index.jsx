import { useEffect, useState } from 'react';
import './styles.css';

const Table = ({ dragged, id, data, role, tableOnDrop, emptyTable, tableOnDragEnter, tableOnDragLeave, tableOnDragOver, dragHandler }) => {
    const [ columns, setColumns ] = useState([]);
    const [ canIUpdate, setCanIUpdate ] = useState(true);

    const createColumnn = () => {
        return (
            data
                .map(item => columns.map( column => item[column]))
                .map((item) => (
                    <tr key={Math.random() * 10} className="table__row">
                        {
                            item.map(value => <td className="table__cell" key={value + Math.random() * 100}>{ value }</td>)
                        }
                    </tr>
                ))
        );
    };

    const onDropHandler = event => {
        event.preventDefault();
        tableOnDrop(columns, setColumns);
    };

    const deleteColumn = event => {
        const columnName = event.target.parentNode.getAttribute("data-key");
        setColumns(c => c.filter(column => column !== columnName));
        setCanIUpdate(b => false)
    };

    useEffect(() => {
        if((!columns.includes(dragged.current.id)) && (columns.length === 0) && canIUpdate) {
            setColumns(c => [...c, dragged.current.id]);
        }
    }, [ dragged, columns, canIUpdate ]);

    return (
        <div className="table-responsive">
            <table 
                id={id}
                onDragEnter={tableOnDragEnter}
                onDragLeave={tableOnDragLeave}
                onDragOver={tableOnDragOver} 
                onDrop={onDropHandler}
                className="table table-hover table-bordered table-striped "
                draggable="true"
                data-role={role}
                onDragStart={dragHandler}
                >
                    {
                        columns.length > 0 ? (
                            <>
                                <thead className="thead-dark">
                                    <tr>
                                        {
                                            columns.map(column => (
                                                <th 
                                                    key={column} 
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
                                    { createColumnn() }
                                </tbody>
                            </>
                        ) : emptyTable
                    }
            </table>
        </div>
    );
};

export default Table;