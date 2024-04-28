import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { columns, mobileColumns, customStyles } from "../api/data";
import { Data } from "../types";

interface Props {
    data: Data[];
}

function Table({ data }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage: number = 10;
    const pageSize = 10;
    const pageCount: number = Math.ceil(data.length / itemsPerPage);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const paginatedData = data.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="w-full h-auto overflow-x-auto mt-8 bg-white pb-10 rounded-xl md:text-left relative">
            <div className="absolute top-8 left-6">
            </div>
            <h1 className="text-18px font-bold font-montserrat mb-4 py-6 md:text-22px ml-20">
                Lista de Restaurantes
            </h1>
            <DataTable
                className="sm:px-4"
                columns={isMobile ? mobileColumns : columns}
                data={paginatedData}
                customStyles={customStyles}
                responsive
            />
            <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="pagination flex justify-center mt-7"
                pageClassName="px-2"
                activeClassName="text-blue-600 font-bold"
                previousClassName="border border-gray-300 px-3 py-1 rounded-lg mr-2"
                nextClassName="border border-gray-300 px-3 py-1 rounded-lg ml-2"
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );
}

export default Table;