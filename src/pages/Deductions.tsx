import React, { useState } from 'react';
import FormHeader from '@/components/FormHeader';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';

interface Deduction {
  id: string;
  name: string;
  pan: string;
  amountPaid: number;
  paidDate: string;
  deductionDate: string;
  deductedAmount: number;
  deductionRate: number;
  section: string;
  reasonForLowerDeduction?: string;
}

const Deductions: React.FC = () => {
  const navigate = useNavigate();
  const [deductions, setDeductions] = useState<Deduction[]>([]);

  const columns = [
    { key: 'name', label: 'Name', required: true, width: 'min-w-48' },
    { key: 'pan', label: 'PAN', required: true, width: 'min-w-32' },
    { key: 'amountPaid', label: 'Amount Paid / Credited', type: 'number' as const, required: true, width: 'min-w-40' },
    { key: 'paidDate', label: 'Paid / Credited Date', type: 'date' as const, required: true, width: 'min-w-36' },
    { key: 'deductionDate', label: 'Deduction Date', type: 'date' as const, required: true, width: 'min-w-36' },
    { key: 'deductedAmount', label: 'Deducted and Deposited - Tax', type: 'number' as const, required: true, width: 'min-w-48' },
    { key: 'deductionRate', label: 'Deduction Rate', type: 'number' as const, required: true, width: 'min-w-32' },
    { 
      key: 'section', 
      label: 'Section', 
      type: 'select' as const, 
      options: ['194B - Winnings', '194C - Contractors', '194I - Rent', '194J - Professional'], 
      required: true,
      width: 'min-w-40'
    },
    { key: 'reasonForLowerDeduction', label: 'Reason for Lower/Higher Deduction', width: 'min-w-48' }
  ];

  const handleAdd = () => {
    const newDeduction: Deduction = {
      id: Date.now().toString(),
      name: '',
      pan: '',
      amountPaid: 0,
      paidDate: '',
      deductionDate: '',
      deductedAmount: 0,
      deductionRate: 0,
      section: '',
      reasonForLowerDeduction: ''
    };
    setDeductions([...deductions, newDeduction]);
  };

  const handleEdit = (id: string) => {
    console.log('Edit deduction:', id);
  };

  const handleDelete = (id: string) => {
    setDeductions(deductions.filter(d => d.id !== id));
  };

  const handleCellChange = (rowId: string, field: string, value: any) => {
    setDeductions(deductions.map(d => 
      d.id === rowId ? { ...d, [field]: value } : d
    ));
  };

  const handleSave = () => {
    console.log('Saving deductions:', deductions);
    // Here you would typically call your API service
    // apiService.saveDeductions(deductions);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FormHeader
          formNumber="26Q"
          quarter="2"
          title="Deductions"
          finYear="2020-21"
          fileName="Super Traders-20-21"
        />

        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Deductor
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Challan Amount:</span>
            <span className="font-medium text-primary">44,280</span>
            <span className="text-muted-foreground">Amount Deducted:</span>
            <span className="font-medium text-primary">44,280</span>
            <span className="text-muted-foreground">Balance:</span>
            <span className="font-medium text-destructive">0</span>
            <span className="text-muted-foreground">Number of Deductions:</span>
            <span className="font-medium text-primary">{deductions.length}</span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={deductions}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellChange={handleCellChange}
          title="Deductions List"
          className="mb-6"
        />

        {/* Bottom Navigation */}
        <div className="flex justify-center gap-4 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/deductees')}>
            Deductee
          </Button>
          <Button variant="outline" onClick={() => navigate('/challans')}>
            Challan
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Deductions;