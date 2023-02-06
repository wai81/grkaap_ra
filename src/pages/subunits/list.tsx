import React from "react";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    EditButton,
    ShowButton,
    DeleteButton,
    List,
    Checkbox,
    DateField,
} from "@pankod/refine-mui";

export const SubunitsList = () => {
    const { dataGridProps } = useDataGrid();

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            {
                field: "id",
                headerName: "Id",
                minWidth: 50,
            },
            {
                field: "name",
                headerName: "Name",
                minWidth: 200,
            },
            {
                field: "fullname",
                headerName: "Fullname",
                minWidth: 200,
            },
            {
                field: "is_active",
                headerName: "Is Active",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <Checkbox checked={!!value} />;
                },
            },
            {
                field: "color_subunit",
                headerName: "Color Subunit",
                minWidth: 200,
            },
            {
                field: "organization",
                headerName: "Organization",
                valueGetter: ({ row }) => {
                    const value = row?.organization?.name;

                    return value;
                },
                minWidth: 300,
            },
            {
                field: "created_at",
                headerName: "Created At",
                minWidth: 250,
                renderCell: function render({ value }) {
                    return <DateField value={value} />;
                },
            },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton hideText recordItemId={row.id} />
                            <ShowButton hideText recordItemId={row.id} />
                        </>
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <List>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
