import 'react-data-grid/lib/styles.css';

import { DataGrid, type Column } from 'react-data-grid';

export default function GridControl(props) {    

    const columns: Column<any>[] = [];
    if (props.grid_columns) {
        props.grid_columns.forEach(col => {
            columns.push({ key: col.json_field_name, name: col.placeholder, width: col.width || 150 });
        });
    }

    return (
        <div className="datagridcontrolcontainer">
            <DataGrid
                columns={columns}
                rows={props.data}
                defaultColumnOptions={{
                    sortable: true,
                    resizable: true
                }}
                style={{ height: props.height || 400 }}
            />
        </div>
    );
}