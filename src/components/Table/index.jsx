import { useEffect, useState } from 'react';
import './styles.css';

const Table = ({ dragged, data, tableOnDrop, tableOnDragEnter, tableOnDragLeave, tableOnDragOver }) => {
    const [ columns, setColumns ] = useState([]);
    const [ sortedData, setSortedData ] = useState([]);

    const comparator = (key) => {
        let sort = []
        if(/^-?\d+(.?\d+)?/.test(data[0][key])) { 
            sort = data.sort((a, b) => {
                let x = parseFloat(a[key]);
                let y = parseFloat(b[key]);

                if (x > y) {
                    return 1;
                  }
                  if (x < y) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });
        } else {
            sort = data.sort((a, b) => {
                if (a[key] > b[key]) {
                    return 1;
                  }
                  if (a[key] < b[key]) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });
        }
        
        setSortedData(d => sort);
    };

    const createColumnn = () => {
        return (
            sortedData
                .map(item => columns.map( column => item[column]))
                .map((item) => (
                    <tr key={Math.random() * 10} className="table__row">
                        {
                            item.map((value, index) => <td className="table__cell" key={value + 1}>{ value }</td>)
                        }
                    </tr>
                ))
        );
    };

    const onDropHandler = event => {
        event.preventDefault();
        tableOnDrop(columns, setColumns);
    };

    useEffect(() => {
        if((!columns.includes(dragged.current.id)) && (columns.length === 0)) {
            setColumns(c => [...c, dragged.current.id]);
        }
    }, [ dragged, columns ]);

    useEffect(() => setSortedData(d => data), [ data ]);

    return (
        columns && (
            <div className="table-responsive">
                <table 
                    onDragEnter={tableOnDragEnter}
                    onDragLeave={tableOnDragLeave}
                    onDragOver={tableOnDragOver} 
                    onDrop={onDropHandler}
                    className="table able-hover table-bordered table-striped "
                    >
                    <thead className="thead-dark">
                        <tr>
                            {
                                columns.map(column => (
                                    <th 
                                        key={column} 
                                        data-key={column}
                                        className="table__cell table__cell--heading"
                                        onClick={event => comparator(event.target.getAttribute("data-key"))}>
                                            { column }
                                        </th>
                                    )
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        { createColumnn() }
                    </tbody>
                </table>
            </div>
        )
    );
};

export default Table;