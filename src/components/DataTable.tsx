import React from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash2, Edit3, Plus } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'select';
  options?: string[];
  required?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCellChange: (rowId: string, field: string, value: any) => void;
  title: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onCellChange,
  title,
  className = ''
}) => {
  const containerRef = useKeyboardNavigation({ enabled: true });

  const handleCellChange = (rowId: string, field: string, value: any) => {
    onCellChange(rowId, field, value);
  };

  const renderCell = (row: any, column: Column, rowIndex: number, colIndex: number) => {
    const cellId = `${rowIndex}-${colIndex}`;
    const value = row[column.key] || '';

    if (column.type === 'select' && column.options) {
      return (
        <select
          value={value}
          onChange={(e) => handleCellChange(row.id, column.key, e.target.value)}
          className="w-full px-2 py-1 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-focus-ring"
          data-cell-id={cellId}
        >
          <option value="">Select...</option>
          {column.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <Input
        type={column.type || 'text'}
        value={value}
        onChange={(e) => handleCellChange(row.id, column.key, e.target.value)}
        className="w-full text-sm border-0 bg-transparent focus:bg-card focus:border focus:border-border rounded px-2 py-1"
        placeholder={`Enter ${column.label.toLowerCase()}`}
        data-cell-id={cellId}
      />
    );
  };

  return (
    <div ref={containerRef} className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-card-foreground">{title}</h2>
        <Button onClick={onAdd} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Row
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="w-12 p-2 text-left text-sm font-medium text-muted-foreground">No.</th>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`p-2 text-left text-sm font-medium text-muted-foreground ${column.width || 'min-w-32'}`}
                >
                  {column.label}
                  {column.required && <span className="text-required ml-1">*</span>}
                </th>
              ))}
              <th className="w-24 p-2 text-center text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="p-8 text-center text-muted-foreground">
                  No data available. Click "Add Row" to get started.
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={row.id || rowIndex} 
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                  data-row
                >
                  <td className="p-2 text-sm text-muted-foreground font-mono">
                    {rowIndex + 1}
                  </td>
                  {columns.map((column, colIndex) => (
                    <td key={column.key} className="p-2">
                      {renderCell(row, column, rowIndex, colIndex)}
                    </td>
                  ))}
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(row.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(row.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t border-border text-sm text-muted-foreground">
          <span>Total Records: {data.length}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;