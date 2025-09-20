import React, { useState } from 'react';
import FormHeader from '@/components/FormHeader';
import DataTable from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, CreditCard } from 'lucide-react';

interface Challan {
  id: string;
  dateOfChallan: string;
  section: string;
  depositedTax: number;
  interest: number;
  fee: number;
  otherAmount: number;
  totalAmountDeposited: number;
  challanSerialNo: string;
  bankBranchCode: string;
  challanVerificationResult: string;
  interestAllocated: number;
  othersAllocated: number;
}

const Challans: React.FC = () => {
  const navigate = useNavigate();
  const [challans, setChallans] = useState<Challan[]>([]);

  const columns = [
    { key: 'dateOfChallan', label: 'Date of Challan', type: 'date' as const, required: true, width: 'min-w-36' },
    { 
      key: 'section', 
      label: 'Section', 
      type: 'select' as const,
      options: ['194B - Winnings', '194C - Contractors', '194I - Rent', '194J - Professional'],
      required: true,
      width: 'min-w-40'
    },
    { key: 'depositedTax', label: 'Deposited - Tax', type: 'number' as const, required: true, width: 'min-w-32' },
    { key: 'interest', label: 'Interest', type: 'number' as const, width: 'min-w-28' },
    { key: 'fee', label: 'Fee', type: 'number' as const, width: 'min-w-24' },
    { key: 'otherAmount', label: 'Other Amount', type: 'number' as const, width: 'min-w-32' },
    { key: 'totalAmountDeposited', label: 'Total Amount Deposited', type: 'number' as const, required: true, width: 'min-w-40' },
    { key: 'challanSerialNo', label: 'Challan / DDO Serial No.', required: true, width: 'min-w-40' },
    { key: 'bankBranchCode', label: 'Bank Branch Code', required: true, width: 'min-w-36' },
    { 
      key: 'challanVerificationResult', 
      label: 'Challan verification result',
      type: 'select' as const,
      options: ['Verified', 'Not Verified', 'Pending', 'Error'],
      width: 'min-w-40'
    },
    { key: 'interestAllocated', label: 'Interest allocated for the quarter', type: 'number' as const, width: 'min-w-48' },
    { key: 'othersAllocated', label: 'Others allocated for the quarter', type: 'number' as const, width: 'min-w-48' }
  ];

  const handleAdd = () => {
    const newChallan: Challan = {
      id: Date.now().toString(),
      dateOfChallan: '',
      section: '',
      depositedTax: 0,
      interest: 0,
      fee: 0,
      otherAmount: 0,
      totalAmountDeposited: 0,
      challanSerialNo: '',
      bankBranchCode: '',
      challanVerificationResult: '',
      interestAllocated: 0,
      othersAllocated: 0
    };
    setChallans([...challans, newChallan]);
  };

  const handleEdit = (id: string) => {
    console.log('Edit challan:', id);
  };

  const handleDelete = (id: string) => {
    setChallans(challans.filter(c => c.id !== id));
  };

  const handleCellChange = (rowId: string, field: string, value: any) => {
    setChallans(challans.map(c => {
      if (c.id === rowId) {
        const updated = { ...c, [field]: value };
        
        // Auto-calculate total amount deposited
        if (['depositedTax', 'interest', 'fee', 'otherAmount'].includes(field)) {
          updated.totalAmountDeposited = 
            (updated.depositedTax || 0) + 
            (updated.interest || 0) + 
            (updated.fee || 0) + 
            (updated.otherAmount || 0);
        }
        
        return updated;
      }
      return c;
    }));
  };

  const handleSave = () => {
    console.log('Saving challans:', challans);
    // Here you would typically call your API service
    // apiService.saveChallans(challans);
  };

  const totalChallans = challans.length;
  const totalAmount = challans.reduce((sum, c) => sum + (c.totalAmountDeposited || 0), 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FormHeader
          formNumber="26Q"
          quarter="1"
          title="Challans"
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

          <Button 
            variant="outline" 
            className="flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Bank Codes
          </Button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Number of Challans:</span>
            <span className="font-medium text-primary">{totalChallans}</span>
            <span className="text-muted-foreground">Total Amount:</span>
            <span className="font-medium text-primary">{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={challans}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCellChange={handleCellChange}
          title="Challans List"
          className="mb-6"
        />

        {/* Info Section */}
        {challans.length > 0 && (
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>How to add Challans in Revised return?</strong>
              <br />
              Add new challans or modify existing ones. The system will automatically calculate totals and validate challan details.
            </p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex justify-center gap-4 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => navigate('/deductees')}>
            Deductee
          </Button>
          <Button variant="outline" onClick={() => navigate('/deductions')}>
            Deduction
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

export default Challans;