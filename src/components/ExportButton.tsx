import React, { useState } from "react";
import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import { Data } from "../types";

interface Props {
  usersAll: Data[];
}

const headers = [
  { label: "Nome", key: "name" },
  { label: "Endereço", key: "address" },
  { label: "E-mail", key: "email" },
  { label: "Telefone", key: "phone" },
  { label: "Tipo de comida", key: "foodType" },
  { label: "Instagram", key: "instagram" },
];

export default function ExportButton({ usersAll }: Props) {
  const [loading, setLoading] = useState(false);

  const handleExportXLS = async () => {
    setLoading(true);
    try {
      const wb = XLSX.utils.book_new();
      const wsData = usersAll.map((user) => ({
        "Nome": user.name,
        "Endereço": user.address,
        "Email": user.email,
        "Telefone": user.phone,
        "Tipo de Comida": user.foodType,
        "Instagram": user.instagram,
      }));
      const ws = XLSX.utils.json_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, "Usuários");
      const wbout: ArrayBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });
      XLSX.writeFile(wb, "users.xlsx");
    } catch (error) {
      console.error("Error exporting users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end gap-4 mr-10">
      <button
        onClick={handleExportXLS}
        className="bg-blue-500 hover:bg-blue-700 text-10px text-white font-bold px-4 rounded"
        disabled={loading}
      >
        {loading ? "Exporting..." : "Export XLS"}
      </button>
      <CSVLink
        className="bg-blue-500 hover:bg-blue-700 text-10px text-white font-bold py-1 px-4 rounded"
        data={usersAll}
        headers={headers}
      >
        Export CSV
      </CSVLink>
    </div>
  );
}
