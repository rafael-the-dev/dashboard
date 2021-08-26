import Button from '../../components/Button';

const Home = () => {
    return (
        <>
            <header className="d-flex justify-between align-center px header">
                <h1 className="header__title">Dashboard</h1>
                <div>
                    <Button ariaLabel="drag the button to create a table" className="fas fa-table border-none header__button" />
                    <Button ariaLabel="drag the button to create a chart" className="fas  border-none fa-chart-line header__button" />
                </div>
            </header>
        </>
    );
};

export default Home;