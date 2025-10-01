import 'react-data-grid/lib/styles.css';

import { DataGrid, type Column } from 'react-data-grid';

export default function GridControl(props) {    

    const columns: Column<any>[] = [];
    if (props.columns) {
        props.columns.forEach(col => {
            columns.push({ key: col.key, name: col.name, width: col.width || 150 });
        });
    }
    console.log({ columns, height: props.height, title: "GridControl" });

    return (
        <div className="datagridcontrolcontainer">
            <DataGrid
                columns={columns}
                rows={props.rows}
                defaultColumnOptions={{
                    sortable: true,
                    resizable: true
                }}
                style={{ height: props.height || 400 }}
            />
        </div>
    );
}