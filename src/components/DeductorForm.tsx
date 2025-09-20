import React, { useState } from 'react';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import FormHeader from './FormHeader';
import FormSection from './FormSection';
import FormField from './FormField';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

interface DeductorFormData {
  // Deductor Details
  tan: string;
  pan: string;
  gstin: string;
  name: string;
  nameAsPerDept: string;
  doorNo: string;
  building: string;
  road: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  addressChange: boolean;
  stdCode: string;
  telephone: string;
  email: string;
  branchDivision: string;
  
  // Responsible Person Details
  deductorType: string;
  financialYear: string;
  rpName: string;
  rpDesignation: string;
  rpDoorNo: string;
  rpBuilding: string;
  rpRoad: string;
  rpArea: string;
  rpCity: string;
  rpState: string;
  rpPincode: string;
  rpAddressChange: boolean;
  rpStdCode: string;
  rpTelephone: string;
  rpEmail: string;
  rpPan: string;
  rpFatherName: string;
  rpMobileNo: string;
  rpGender: string;
}

const DeductorForm: React.FC = () => {
  const [formData, setFormData] = useState<DeductorFormData>({
    tan: '',
    pan: '',
    gstin: '',
    name: '',
    nameAsPerDept: '',
    doorNo: '',
    building: '',
    road: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    addressChange: false,
    stdCode: '',
    telephone: '',
    email: '',
    branchDivision: '',
    deductorType: '',
    financialYear: '2025-26',
    rpName: '',
    rpDesignation: '',
    rpDoorNo: '',
    rpBuilding: '',
    rpRoad: '',
    rpArea: '',
    rpCity: '',
    rpState: '',
    rpPincode: '',
    rpAddressChange: false,
    rpStdCode: '',
    rpTelephone: '',
    rpEmail: '',
    rpPan: '',
    rpFatherName: '',
    rpMobileNo: '',
    rpGender: ''
  });

  const containerRef = useKeyboardNavigation({ enabled: true });

  const handleInputChange = (field: keyof DeductorFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    }));
  };

  const handleNavigation = () => {
    // Handle form navigation
    console.log('Navigate to next section');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <FormHeader
          formNumber="26Q"
          quarter="1"
          title="Deductor Details"
          finYear="2025-26"
          fileName="New File"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deductor's Details Section */}
          <FormSection title="Deductor's Details" helpIcon onHelp={() => console.log('Help clicked')}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                label="TAN"
                required
                value={formData.tan}
                onChange={handleInputChange('tan')}
                placeholder="Enter TAN"
              />
              <FormField
                label="PAN"
                required
                value={formData.pan}
                onChange={handleInputChange('pan')}
                placeholder="Enter PAN"
              />
              <FormField
                label="GSTIN"
                value={formData.gstin}
                onChange={handleInputChange('gstin')}
                placeholder="Enter GSTIN"
              />
              <FormField
                label="Name"
                required
                value={formData.name}
                onChange={handleInputChange('name')}
                placeholder="Enter name"
              />
              <FormField
                label="Name as per department records"
                value={formData.nameAsPerDept}
                onChange={handleInputChange('nameAsPerDept')}
                placeholder="Enter name as per records"
              />
              <FormField
                label="Door No"
                required
                value={formData.doorNo}
                onChange={handleInputChange('doorNo')}
                placeholder="Enter door number"
              />
              <FormField
                label="Building"
                value={formData.building}
                onChange={handleInputChange('building')}
                placeholder="Enter building"
              />
              <FormField
                label="Road"
                value={formData.road}
                onChange={handleInputChange('road')}
                placeholder="Enter road"
              />
              <FormField
                label="Area"
                value={formData.area}
                onChange={handleInputChange('area')}
                placeholder="Enter area"
              />
              <FormField
                label="City"
                value={formData.city}
                onChange={handleInputChange('city')}
                placeholder="Enter city"
              />
              <FormField
                label="State"
                required
                value={formData.state}
                onChange={handleInputChange('state')}
                placeholder="Enter state"
              />
              <FormField
                label="Pincode"
                required
                value={formData.pincode}
                onChange={handleInputChange('pincode')}
                placeholder="Enter pincode"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-form-label">Address Change</span>
                <span className="text-required">*</span>
                <select
                  value={formData.addressChange ? 'Yes' : 'No'}
                  onChange={(e) => setFormData(prev => ({ ...prev, addressChange: e.target.value === 'Yes' }))}
                  className="px-2 py-1 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <FormField
                label="STD Code"
                value={formData.stdCode}
                onChange={handleInputChange('stdCode')}
                placeholder="Enter STD code"
              />
              <FormField
                label="Telephone"
                required
                value={formData.telephone}
                onChange={handleInputChange('telephone')}
                placeholder="Enter telephone"
              />
              <FormField
                label="E-Mail"
                required
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                placeholder="Enter email"
              />
              <FormField
                label="Branch/Division"
                value={formData.branchDivision}
                onChange={handleInputChange('branchDivision')}
                placeholder="Enter branch/division"
              />
            </div>
          </FormSection>

          {/* Navigation Button */}
          <div className="lg:hidden flex justify-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNavigation}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Responsible Person's Details Section */}
          <FormSection title="Responsible Person's Details" helpIcon onHelp={() => console.log('Help clicked')}>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                label="Deductor's Type"
                required
                value={formData.deductorType}
                onChange={handleInputChange('deductorType')}
                placeholder="Enter deductor type"
              />
              <FormField
                label="Financial Year"
                value={formData.financialYear}
                onChange={handleInputChange('financialYear')}
                placeholder="2025-26"
                readOnly
              />
              <FormField
                label="Name"
                required
                value={formData.rpName}
                onChange={handleInputChange('rpName')}
                placeholder="Enter name"
              />
              <FormField
                label="Designation"
                required
                value={formData.rpDesignation}
                onChange={handleInputChange('rpDesignation')}
                placeholder="Enter designation"
              />
              <FormField
                label="Door No"
                required
                value={formData.rpDoorNo}
                onChange={handleInputChange('rpDoorNo')}
                placeholder="Enter door number"
              />
              <FormField
                label="Building"
                value={formData.rpBuilding}
                onChange={handleInputChange('rpBuilding')}
                placeholder="Enter building"
              />
              <FormField
                label="Road"
                value={formData.rpRoad}
                onChange={handleInputChange('rpRoad')}
                placeholder="Enter road"
              />
              <FormField
                label="Area"
                value={formData.rpArea}
                onChange={handleInputChange('rpArea')}
                placeholder="Enter area"
              />
              <FormField
                label="City"
                value={formData.rpCity}
                onChange={handleInputChange('rpCity')}
                placeholder="Enter city"
              />
              <FormField
                label="State"
                required
                value={formData.rpState}
                onChange={handleInputChange('rpState')}
                placeholder="Enter state"
              />
              <FormField
                label="Pincode"
                required
                value={formData.rpPincode}
                onChange={handleInputChange('rpPincode')}
                placeholder="Enter pincode"
              />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-form-label">Address Change</span>
                <span className="text-required">*</span>
                <select
                  value={formData.rpAddressChange ? 'Yes' : 'No'}
                  onChange={(e) => setFormData(prev => ({ ...prev, rpAddressChange: e.target.value === 'Yes' }))}
                  className="px-2 py-1 text-sm border border-border rounded bg-card focus:outline-none focus:ring-2 focus:ring-focus-ring"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <FormField
                label="STD Code"
                value={formData.rpStdCode}
                onChange={handleInputChange('rpStdCode')}
                placeholder="Enter STD code"
              />
              <FormField
                label="Telephone"
                required
                value={formData.rpTelephone}
                onChange={handleInputChange('rpTelephone')}
                placeholder="Enter telephone"
              />
              <FormField
                label="E-Mail"
                required
                type="email"
                value={formData.rpEmail}
                onChange={handleInputChange('rpEmail')}
                placeholder="Enter email"
              />
              <FormField
                label="PAN"
                required
                value={formData.rpPan}
                onChange={handleInputChange('rpPan')}
                placeholder="Enter PAN"
              />
              <FormField
                label="Father's Name"
                value={formData.rpFatherName}
                onChange={handleInputChange('rpFatherName')}
                placeholder="Enter father's name"
              />
              <FormField
                label="Mobile No"
                required
                value={formData.rpMobileNo}
                onChange={handleInputChange('rpMobileNo')}
                placeholder="Enter mobile number"
              />
              <FormField
                label="Gender"
                value={formData.rpGender}
                onChange={handleInputChange('rpGender')}
                placeholder="Enter gender"
              />
            </div>
          </FormSection>
        </div>

        {/* Form Actions */}
        <div className="flex justify-center gap-4 pt-6">
          <Button variant="outline">Reset</Button>
          <Button>Save & Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default DeductorForm;