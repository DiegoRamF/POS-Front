import { Session } from "@supabase/supabase-js";

export interface RegisterPayload {
  tenant_name: string,
  full_name: string,
  email: string,
  phone: number,
  password: string,
};

export interface OnboardingPayload {
  full_name: string,
  tenant_name: string,
};

export interface Tenant {
  id: string,
  name: string,
};

export interface OnboardingResponse {
  tenant: Tenant;
}

export type OAuthProvider = 'google';

export interface AuthState {
  session: Session | null,
  selectedTenantId: string | null,
  isLoading: boolean,
};
