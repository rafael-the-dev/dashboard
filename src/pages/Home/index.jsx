import { useCallback, useRef, useState } from 'react';
import './styles.css';
import Button from '../../components/Button';
import data from '../../data.json';
import Table from '../../components/Table';

const Home = () => {
    const [ elements, setElements ] = useState([]);
    const dragged = useRef(null);

    const tabDragHandler = async event => {
        dragged.current = event.target;
        event.dataTransfer.setData('text/plain',null);
    };


    const preventDefault = event => event.preventDefault();
    const onDragEnterHandler = event => event.target.classList.add('drag-enter');
    const onDragLeaveHandler = event => event.target.classList.remove('drag-enter');

    const tableOnDragEnterHandler = event => event.target.classList.add('table--drag-enter');
    const tableOnDragLeaveHandler = event => event.target.classList.remove('table--drag-enter');
    
    const tableOnDropHandler = useCallback((columns, setColumns) => {
        //console.log(columns)
        //console.log(dragged)
        console.log(dragged.current?.getAttribute('data-role'))
        if((dragged.current?.getAttribute('data-role')) === "column" && !( columns.includes(dragged.current?.id))) {
            console.log("yes")
            setColumns(c => [...c, dragged.current?.id]);
        }

        console.log("after", columns)
    }, [ dragged ]);

    const onDropHandler = event => {
        preventDefault(event);
        event.target.classList.remove('drag-enter');
        if(event.target.id === "droppable-area") {
            if(dragged.current.getAttribute('data-role')  === "column") {
                const table = <Table 
                    data={data} 
                    dragged={dragged}
                    column={dragged.id} 
                    key={Math.random() * 100}
                    tableOnDragEnter={tableOnDragEnterHandler}
                    tableOnDragLeave={tableOnDragLeaveHandler}
                    tableOnDragOver={preventDefault}
                    tableOnDrop={tableOnDropHandler}
                />;
                setElements(e => [...elements, table]);
            }
        }
        event.stopPropagation();
    };

    return (
        <>
            <header className="d-flex justify-between align-center px header">
                <h1 className="header__title">Dashboard</h1>
                <div>
                    <Button ariaLabel="drag the button to create a table" className="fas fa-table border-none header__button" />
                    <Button ariaLabel="drag the button to create a chart" className="fas  border-none fa-chart-line header__button" />
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
                                className="tab" />
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