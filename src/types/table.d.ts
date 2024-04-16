interface TableLayoutProps {
    children: RowElement | RowElement[];
    data: IRole[] | IUser[];
    lngKey?: string;
    setTablePage?: React.Dispatch<React.SetStateAction<number>>;
    setTableRowsPerPage?: React.Dispatch<React.SetStateAction<number>>;
    tHeaders: string[];
    totalData: number;
}
