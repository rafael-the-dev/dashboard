import { useCallback, useRef, useState } from 'react';
import './styles.css';
import Button from '../../components/Button';
import data from '../../data.json';
import Table from '../../components/Table';
import CustomTable from '../../components/CustomTable';
import Chart from '../../components/Chart';

const Home = () => {
    const [ elements, setElements ] = useState([]);
    const dragged = useRef(null);

    const classRemover = (event, className) => event.target.classList.remove(className);
    const addClass = (event, className) => event.target.classList.add(className);

    const tabDragHandler = event => {
        event.stopPropagation();
        dragged.current = event.target;
        event.dataTransfer.setData('text/plain',null);
    };

    const preventDefault = event => event.preventDefault();
    const onDragEnterHandler = event => addClass(event, 'drag-enter');
    const onDragLeaveHandler = event => classRemover(event, 'drag-enter');

    const tableOnDragEnterHandler = event => addClass(event, 'table--drag-enter');
    const tableOnDragLeaveHandler = event => classRemover(event, 'table--drag-enter');
    
    const tableOnDropHandler = useCallback((columns, setColumns) => {
        if((dragged.current?.getAttribute('data-role')) === "column" && !( columns.includes(dragged.current?.id))) {
            setColumns(c => [...c, dragged.current?.id]);
        }
    }, [ dragged ]);

    const chartOnDragEnterHandler = event => addClass(event, 'table--drag-enter');
    const chartOnDragLeaveHandler = event => classRemover(event, 'table--drag-enter');

    const onDropHandler = event => {
        preventDefault(event);
        classRemover(event, 'drag-enter');
        let table = "";

        if(event.target.id === "droppable-area") {
            if(dragged.current.getAttribute('data-role')  === "column") {
                const key = Math.random() * 10;
                table = <Table 
                    data={data} 
                    dragged={dragged}
                    column={dragged.id}  
                    id={key}
                    key={key}
                    tableOnDragEnter={tableOnDragEnterHandler}
                    tableOnDragLeave={tableOnDragLeaveHandler}
                    tableOnDragOver={preventDefault}
                    tableOnDrop={tableOnDropHandler}
                    dragHandler={tabDragHandler}
                    role="table"
                />;
            } else if(dragged.current.getAttribute('data-role')  === "table") {
                const key = Math.random() * 10;
                table = <CustomTable
                    data={data} 
                    id={key}
                    key={key}
                    tableOnDragEnter={tableOnDragEnterHandler}
                    tableOnDragLeave={tableOnDragLeaveHandler}
                    tableOnDragOver={preventDefault}
                    dragHandler={tabDragHandler}
                    tableOnDrop={tableOnDropHandler}
                    role="table"
                />
            } else if(dragged.current.getAttribute('data-role')  === "chart") {
                const key = Math.random() * 1000;
                table = <Chart
                    data={data}
                    id={key}
                    key={key}
                    type="Bar"
                    OnDragEnter={chartOnDragEnterHandler}
                    OnDragLeave={chartOnDragLeaveHandler}
                    OnDragOver={preventDefault}
                    dragHandler={tabDragHandler}
                    OnDrop={tableOnDropHandler}
                    role="chart"
                 />
            }
            
            setElements(e => [...elements, table]);
        }
        event.stopPropagation();
    };

    const deleteAll = () => setElements(e => []);
    const trashOnDragEnter = event => addClass(event, 'trash--drag-enter')
    const trashOnDragLeave = event => classRemover(event, 'trash--drag-enter');
    const trashOnDrop = event => {
        preventDefault(event);
        classRemover(event, 'trash--drag-enter')
        if(['table', 'chart'].includes(dragged.current.getAttribute('data-role'))) {
            const newElements = elements.filter(element => element.key !== dragged.current.id);
            setElements(e => newElements);
        }
    }

    return (
        <>
            <header className="d-flex justify-between align-center px header">
                <h1 className="header__title">Dashboard</h1>
                <div>
                    <Button 
                        ariaLabel="drag the button to create a table" 
                        className="fas fa-table border-none header__button" 
                        isDraggable
                        role="table"
                        dragHandler={tabDragHandler}
                    />
                    <Button 
                        ariaLabel="drag the button to create a chart" 
                        className="fas  border-none fa-chart-line header__button" 
                        isDraggable
                        role="chart"
                        dragHandler={tabDragHandler}
                    />
                    <Button 
                        ariaLabel="drop a component to delete it" 
                        className="fas  border-none fa-trash-alt header__button" 
                        onClickHandler={deleteAll}
                        onDragEnter={trashOnDragEnter}
                        onDragLeave={trashOnDragLeave}
                        onDragOver={preventDefault} 
                        onDrop={trashOnDrop}
                    />
                </div>
            </header>
            <main className="px">
                <div className="d-flex align-center justify-start flex-wrap w-100">
                    {
                        Object.keys(data[0]).map(item => (
                            <Button 
                                id={item}
                                key={item} 
                                label={item} 
                                isDraggable 
                                role="column"
                                dragHandler={tabDragHandler}
                                className="tab" 
                            />
                        ))
                    }
                </div>
                <div id="droppable-area" 
                    onDragEnter={onDragEnterHandler}
                    onDragLeave={onDragLeaveHandler}
                    onDragOver={preventDefault} 
                    onDrop={onDropHandler} 
                    className="d-flex flex-wrap w-100 droppable-area">
                    {
                        elements
                    }
                </div>
            </main>
        </>
    );
};

export default Home;