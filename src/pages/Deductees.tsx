import React, { useState } from 'react';
import FormHeader from '@/components/FormHeader';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save } from 'lucide-react';

interface Deductee {
  id: string;
  name: string;
  pan: string;
  typeOfDeductee: string;
  panValidationResult: string;
  panHolderName: string;
}

const Deductees: React.FC = () => {
  const navigate = useNavigate();
  const [deductees, setDeductees] = useState<Deductee[]>([]);

  const columns = [
    { key: 'name', label: 'Name', required: true, width: 'min-w-48' },
    { key: 'pan', label: 'PAN', required: true, width: 'min-w-32' },
    { 
      key: 'typeOfDeductee', 
      label: 'Type of Deductee', 
      type: 'select' as const,
      options: ['Individual', 'Company', 'Firm', 'AOP/BOI', 'Local Authority', 'Artificial Juridical Person', 'Government'],
      required: true,
      width: 'min-w-40'
    },
    { 
      key: 'panValidationResult', 
      label: 'PAN Validation Result / Status', 
      type: 'select' as const,
      options: ['Valid', 'Invalid', 'Not Found', 'Pending'],
      width: 'min-w-48'
    },
    { key: 'panHolderName', label: "PAN holder's name", width: 'min-w-48' }
  ];

  const handleAdd = () => {
    const newDeductee: Deductee = {
      id: Date.now().toString(),
      name: '',
      pan: '',
      typeOfDeductee: '',
      panValidationResult: '',
      panHolderName: ''
    };
    setDeductees([...deductees, newDeductee]);
  };

  const handleEdit = (id: string) => {
    console.log('Edit deductee:', id);
  };

  const handleDelete = (id: string) => {
    setDeductees(deductees.filter(d => d.id !== id));
  };

  const handleCellChange = (rowId: string, field: string, value: any) => {
    setDeductees(deductees.map(d => 
      d.id === rowId ? { ...d, [field]: value } : d
    ));
  };

  const handleSave = () => {
    console.log('Saving deductees:', deductees);
    // Here you would typically call your API service
    // apiService.saveDeductees(deductees);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FormHeader
          formNumber="26Q"
          quarter="1"
          title="Deductees"
          finYear="2025-26"
          fileName="New File"
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
            <span className="text-muted-foreground">Number of Deductees:</span>
            <span className="font-medium text-primary">{deductees.length}</span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={deductees}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellChange={handleCellChange}
          title="Deductees List"
          className="mb-6"
        />

        {/* Bottom Navigation */}
        <div className="flex justify-center gap-4 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/deductions')}>
            Deduction
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

export default Deductees;