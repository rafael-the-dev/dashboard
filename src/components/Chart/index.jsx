import { useEffect, useRef, useState } from 'react';
import GoogleChart from "react-google-charts";
import './styles.css';

const Chart = ({ id, type, data, OnDrop, role,  OnDragEnter, OnDragLeave, OnDragOver, dragHandler}) => {
    const containerRef = useRef(null);
    const [ columns, setColumns ] = useState(["ProductID", "SalesOrderID"]);

    
    const onDropHandler = event => {
        event.preventDefault();
        OnDrop(columns, setColumns);
    };

    const has = (array, element) => {
        let result = false;

        for (let index = 0; index < array.length; index++) {
            if(array[index]["ProductID"] === element["ProductID"]) {
                result = true;
                break;
            }
            
        }

        return result;
    }

    const dataAsArray = () => {
        let results = [];
        data.forEach(element => {
            if(!has(results, element)) {
                results.push(element);
            }
        });
        results = results.map(element => columns.map(column => element[column]));
        return results;
    }

    useEffect(() => {
    }, [ ]);

    return (
        <div 
            ref={containerRef} 
            className="chart-container"
            id={id}
            onDragEnter={OnDragEnter}
            onDragLeave={OnDragLeave}
            onDragOver={OnDragOver} 
            draggable="true"
            onDragStart={dragHandler}
            onDrop={onDropHandler}
            data-role={role}
            >
                <GoogleChart
                    width={'500px'}
                    height={'300px'}
                    chartType={type}
                    loader={<div>Loading Chart</div>}
                    data={[columns, ...dataAsArray()]}
                    options={{
                        // Material design options
                        bar: { groupWidth: 20 },
                        chartArea: { width: '100%' },
                        chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                    />
        </div>
    );
};

export default Chart;