import { useEffect, useRef, useState } from 'react';
import GoogleChart from "react-google-charts";
import './styles.css';

const Chart = ({ id, type, data, OnDrop, role,  OnDragEnter, OnDragLeave, OnDragOver, dragHandler}) => {
    const containerRef = useRef(null);
    const [ groupKey, setGroupKey ] = useState("");
    const [ columns, setColumns ] = useState([]);

    
    const onDropHandler = event => {
        event.preventDefault();
        OnDrop(groupKey, setGroupKey);
    };

    const has = (array, element) => {
        let result = { contains: false, index: -1 };

        for (let index = 0; index < array.length; index++) {
            if(array[index][groupKey] === element[groupKey]) {
                result = { contains: true, index };
                break;
            }
        }

        return result;
    };

    const dataAsArray = () => {
        let results = [];
        data.forEach(element => {
            const result = has(results, element);
            if(result.contains) {
                let standardCost = element.StandardCost + results[result.index].StandardCost;
                let orderQty = element.OrderQty + results[result.index].OrderQty;
                let listPrice = element.ListPrice + results[result.index].ListPrice;
                let newElement = { ...element, StandardCost: standardCost, OrderQty: orderQty, ListPrice: listPrice };
                results[result.index] = newElement;
            } else {
                results.push(element);
            }
        });
        console.log(results)
        results = results.map(element => columns.map(column => element[column]));
        console.log(results)
        return results;
    };

    useEffect(() => {
        setGroupKey(d => "ProductID");
    }, [ ]);

    useEffect(() => {
        setColumns(c => [groupKey, "StandardCost", 'ListPrice', "OrderQty"])
    }, [ groupKey ]);

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
                    width={'100%'}
                    height={'500px'}
                    chartType={type}
                    loader={<div>Loading Chart</div>}
                    data={[columns, ...dataAsArray()]}
                    options={{
                        // Material design options
                        bar: { groupWidth: 50 },
                        chart: {
                        title: `${type} Chart`,
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                    />
        </div>
    );
};

export default Chart;