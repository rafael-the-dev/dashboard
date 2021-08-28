

const ChartTable = ({ columns, data }) => {
    return (
        <>
            <thead className="thead-dark">
                <tr>
                    {
                        columns.map(column => <th key={Math.random() * 56}>{ column }column</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row => (
                        <tr key={Math.random() * 120}>
                            {
                                row.map(( column, index) => (
                                    <td 
                                        key={Math.random() * 32}>
                                        { index !== 0 ? column.toFixed(2) : column }
                                    </td>)
                                )
                            }
                        </tr>
                    ))
                }
            </tbody>
        </>
    );
};

export default ChartTable;