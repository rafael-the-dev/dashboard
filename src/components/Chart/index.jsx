import { useEffect, useRef, useState } from 'react';
import GoogleChart from "react-google-charts";
import './styles.css';

const Chart = ({ id, type, data, OnDrop, role, OnDragEnter, OnDragLeave, OnDragOver, dragHandler, setChartData}) => {
    const containerRef = useRef(null);
    const [ groupKey, setGroupKey ] = useState("");
    const [ columns, setColumns ] = useState([]);

    
    const onDropHandler = event => {
        event.preventDefault();
        OnDrop(groupKey, setGroupKey);
    };

    const searchLessIndex = (array, start) => {
        let minIndex = start;

        if([ 'OrderDate', 'ShipDate', 'UnitPrice' ].includes(groupKey)) {
            for(let index = start + 1; index < array.length; index++) {
                let minIndexDate = new Date(array[minIndex][groupKey]);
                let currentIndexDate = new Date(array[index][groupKey]);
                if( currentIndexDate < minIndexDate) {
                    minIndex = index;
                }
            }
        } else {
            for(let index = start + 1; index < array.length; index++) {
                if(array[index][groupKey] < array[minIndex][groupKey]) {
                    minIndex = index;
                }
            }
        }
        return minIndex;
    }

    const sort = (array) => {
        const innerArray = [].concat(array);
        for(let index = 0; index < innerArray.length; index++) {
            let result = searchLessIndex(innerArray, index);
            let tempElement = innerArray[result];
            innerArray[result] = innerArray[index];
            innerArray[index] = tempElement; 
        }

        return innerArray;
    }

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
        results = sort(results);
        results = results.map(element => columns.map(column => element[column]));
        setChartData([ columns, ...results ]);
        return results;
    };

    const reloadOnClickHandler = () => {
        setColumns(c => [].concat(c));
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
            className="chart-container position-relative"
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
                    chartType={`${type}Chart`}
                    loader={<div>Loading Chart</div>}
                    data={[columns, ...dataAsArray()]}
                    options={{
                        // Material design options
                        bar: { groupWidth: 50 },
                        chart: {
                            title: `${type} Chart`,
                            orientation: 'horizontal'
                        },
                        bars: 'vertical',
                        hAxis: {
                            title: groupKey,
                        }
                    }}
                    // For tests
                />
                <button 
                    onClick={reloadOnClickHandler}
                    className="fas fa-redo-alt btn btn-outline-light bg-transparent position-absolute reload-button">
                </button>
        </div>
    );
};

export default Chart;