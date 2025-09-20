// API Service for network requests
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Deductor API methods
  async getDeductor(id: string) {
    return this.request(`/deductor/${id}`);
  }

  async saveDeductor(data: any) {
    return this.request('/deductor', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDeductor(id: string, data: any) {
    return this.request(`/deductor/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Deductee API methods
  async getDeductees(deductorId: string) {
    return this.request(`/deductees?deductorId=${deductorId}`);
  }

  async saveDeductee(data: any) {
    return this.request('/deductees', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDeductee(id: string, data: any) {
    return this.request(`/deductees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDeductee(id: string) {
    return this.request(`/deductees/${id}`, {
      method: 'DELETE',
    });
  }

  // Deduction API methods
  async getDeductions(deductorId: string) {
    return this.request(`/deductions?deductorId=${deductorId}`);
  }

  async saveDeduction(data: any) {
    return this.request('/deductions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDeduction(id: string, data: any) {
    return this.request(`/deductions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDeduction(id: string) {
    return this.request(`/deductions/${id}`, {
      method: 'DELETE',
    });
  }

  // Challan API methods
  async getChallans(deductorId: string) {
    return this.request(`/challans?deductorId=${deductorId}`);
  }

  async saveChallan(data: any) {
    return this.request('/challans', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChallan(id: string, data: any) {
    return this.request(`/challans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteChallan(id: string) {
    return this.request(`/challans/${id}`, {
      method: 'DELETE',
    });
  }
}

// Create a singleton instance
export const apiService = new ApiService();