import { TableColumn } from "react-data-table-component";
import { Data } from "../types";

export const columns: TableColumn<Data>[] = [
    {
        name: "N°",
        selector: (row) => `${row.id}°`,
        width: "70px",
    },
    {
        name: "Nome",
        selector: (row) => row.name,
        width: "280px",
    },
    {
        name: "Endereço",
        selector: (row) => row.address,
        width: "300px",
    },
    {
        name: "Email",
        selector: (row) => row.email,
        width: "250px",
    },
    {
		name: 'Telefone',
		selector: row => row.phone,
        width: '150px',
	},
    {
        name: "Tipo",
        selector: (row) => row.foodType,
        width: "150px",
    },
];


export const mobileColumns: TableColumn<Data>[] = [
    {
        name: "N°",
        selector: (row) => `${row.id}°`,
        width: "70px",
    },
    {
        name: "Nome",
        selector: (row) => row.name,
        width: "150px",
    },
    {
		name: 'Telefone',
		selector: row => row.phone,
        width: '150px',
	},
];

export const customStyles = {
    rows: {
        style: {
            fontSize: "16px",
        },
    },
    headCells: {
        style: {
            fontSize: "18px",
            fontWeight: "bold",
        },
    },
    cells: {
        style: {
            paddingLeft: "20px",
        },
    },
};
