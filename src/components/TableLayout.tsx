"use client";

// NextJS
import { useTranslations } from "next-intl";

// ReactJS
import { useState } from "react";

// NextUI
import { Table, TableHeader, TableColumn, TableBody, Pagination } from "@nextui-org/react";

// Utils
import { joinClassNames } from "@utils/functions";

export default function TableLayout({ children, data, lngKey = "Table", setTablePage, setTableRowsPerPage, tHeaders, totalData }: TableLayoutProps) {
    // Translation
    const t = useTranslations(lngKey);

    // States
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Functions
    const handlePageChange = (page: number) => {
        setPage(page);
        setTablePage?.(page);
    };

    const handleRowsPerPageChange = (rowsPerPage: number) => {
        setRowsPerPage(rowsPerPage);
        setTableRowsPerPage?.(rowsPerPage);
    };
    
    // Constants
    const pages = Math.ceil(totalData / rowsPerPage);    
  
    return (
        <Table
            bottomContent={
                <div className="flex w-full justify-between items-center">
                    <div className="flex gap-6 justify-between items-center">
                        <label className="flex gap-4 items-center text-small">
                            {t("Rows per page")}
                            <select
                                className="bg-transparent outline-none text-small"
                                onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                            </select>
                        </label>

                        <span className="text-small">
                            {page} - {pages} {t("Of")} {data.length}
                        </span>
                    </div>
        
                    <Pagination
                        showControls
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={(page) => handlePageChange(page)}
                    />
                </div>
            }
            isStriped
        >
            <TableHeader>
                {tHeaders.map((header: string, index: number) => (
                    <TableColumn
                        key={index}
                        className={joinClassNames(
                            index === tHeaders.length - 1 ? "text-center" : "",
                        )}
                    >
                        {t(header)?.toUpperCase()}
                    </TableColumn>
                ))}
            </TableHeader>

            <TableBody emptyContent={"No data found"}>
                {children}
            </TableBody>
        </Table>
    );
}
