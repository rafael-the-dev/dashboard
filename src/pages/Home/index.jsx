import { useCallback, useRef, useState } from 'react';
import './styles.css';
import Button from '../../components/Button';
import data from '../../data.json';
import Table from '../../components/Table';
import CustomTable from '../../components/CustomTable';

const Home = () => {
    const [ elements, setElements ] = useState([]);
    const dragged = useRef(null);

    const tabDragHandler = event => {
        event.stopPropagation();console.log(event.target)
        dragged.current = event.target;
        event.dataTransfer.setData('text/plain',null);
    };

    const preventDefault = event => event.preventDefault();
    const onDragEnterHandler = event => event.target.classList.add('drag-enter');
    const onDragLeaveHandler = event => event.target.classList.remove('drag-enter');

    const tableOnDragEnterHandler = event => event.target.classList.add('table--drag-enter');
    const tableOnDragLeaveHandler = event => event.target.classList.remove('table--drag-enter');
    
    const tableOnDropHandler = useCallback((columns, setColumns) => {
        if((dragged.current?.getAttribute('data-role')) === "column" && !( columns.includes(dragged.current?.id))) {
            setColumns(c => [...c, dragged.current?.id]);
        }
    }, [ dragged ]);

    const onDropHandler = event => {
        preventDefault(event);
        event.target.classList.remove('drag-enter');
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
            }
            
            setElements(e => [...elements, table]);
        }
        event.stopPropagation();
    };

    const deleteAll = () => setElements(e => []);
    const trashOnDragEnter = event => event.target.classList.add('trash--drag-enter')
    const trashOnDragLeave = event => event.target.classList.remove('trash--drag-enter');
    const trashOnDrop = event => {
        preventDefault(event);
        event.target.classList.remove('trash--drag-enter')
        if(dragged.current.getAttribute('data-role') === 'table') {
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
                    <Button ariaLabel="drag the button to create a chart" className="fas  border-none fa-chart-line header__button" />
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