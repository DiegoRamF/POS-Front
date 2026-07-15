export interface Register {
  tenant_name: string,
  full_name: string,
  email: string,
  phone: number,
  password: string,
};

export interface CompleteOnboarding {
  full_name: string,
  tenant_name: string,
};

export interface Tenant {
  id: string,
  name: string
};
