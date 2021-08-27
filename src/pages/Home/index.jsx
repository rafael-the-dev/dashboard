import { useState } from 'react';
import './styles.css';
import Button from '../../components/Button';
import data from '../../data.json';

const Home = () => {
    //useEffect(() => console.log(Object.keys(data[0])));
    const [ dragged, setDragged ] = useState(null);

    const tabDragHandler = event => {
        setDragged(d => event.target);
        event.dataTransfer.setData('text/plain',null)
    };

    const preventDefault = event => event.preventDefault();
    const onDragEnterHandler = event => event.target.classList.add('drag-enter');
    const onDragLeaveHandler = event => event.target.classList.remove('drag-enter');
     
    const onDropHandler = event => {
        preventDefault(event);
        event.target.classList.remove('drag-enter');
        if(dragged.getAttribute('data-role')  === "column") {
        }
    }

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

                </div>
            </main>
        </>
    );
};

export default Home;