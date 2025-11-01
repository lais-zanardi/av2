import React, { useMemo } from 'react';
import { FaSortUp, FaSortDown } from 'react-icons/fa'; 

export interface TableColumn<T> {
    key: keyof T | 'actions' | 'selection'; 
    header: string;                         
    render?: (item: T) => React.ReactNode; 
    sortable?: boolean;
}

export interface GenericTableProps<T> {
    data: T[];                                
    columns: TableColumn<T>[];                
    onRowSelect?: (item: T) => void;
    sortBy?: keyof T | null;
    sortDirection?: 'asc' | 'desc';
    onSort?: (key: keyof T) => void;
}

const GenericTable = <T extends object>({
    data,
    columns,
    onRowSelect,
    sortBy,
    sortDirection,
    onSort,
}: GenericTableProps<T>): React.ReactElement => {
    if (!data || data.length === 0) {
        return (
            <div className="text-gray-500 p-4 border bg-white">
                Nenhum registro encontrado.
            </div>
        );
    }

    const renderCell = (item: T, column: TableColumn<T>) => {
        if (column.render) {
            return column.render(item);
        }

        if (column.key === 'selection' && onRowSelect) {
            return (
                <input 
                    type="checkbox" 
                    className="form-checkbox h-4 w-4 text-blue-600" 
                    onChange={() => onRowSelect(item)} 
                />
            );
        }

        const value = item[column.key as keyof T];
        return value !== undefined && value !== null ? String(value) : '';
    };

    return (
        <div className="overflow-x-auto shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
                
                {/* Cabeçalho */}
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                onClick={() => column.sortable && onSort && onSort(column.key as keyof T)}
                            >
                                <div className="flex items-center">
                                    {column.header}
                                    {column.sortable && (
                                        <span className="ml-2">
                                            {sortBy === column.key && sortDirection === 'asc' && <FaSortUp className="w-3 h-3 text-blue-600" />}
                                            {sortBy === column.key && sortDirection === 'desc' && <FaSortDown className="w-3 h-3 text-blue-600" />}
                                            {sortBy !== column.key && <FaSortUp className="w-3 h-3 text-gray-300" />} {/* Ícone neutro */}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* Corpo da Tabela */}
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-150">
                            {columns.map((column, colIndex) => (
                                <td 
                                    key={String(column.key) + colIndex} 
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                >
                                    {renderCell(item, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GenericTable;

