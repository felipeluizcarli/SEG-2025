
import { api } from "@/lib/axios";

import { UserDto } from "@/cases/users/dtos/user.dto";
import { AuthDto } from "../dto/auth.dto";

const _ENDPOINT = "/auth";

export type LoginMfaRequired = {
  user: UserDto;
  token: string; // conforme comentário do login com MFA pendente
  isMfaValidated: false;
  factorId: string;
};

export type LoginSuccess = {
  user: UserDto;
  token: string;
  isMfaValidated: true;
};

export type MfaFactor = {
  id: string;
  type: string;
  name: string;
  status: string;
};

export type SupabaseUser = {
  id: string;
  type: string;
  name: string;
  status: string;
};

export type LoginResponse = LoginMfaRequired | LoginSuccess;

export type VerifyMfaResponse = {
  user: UserDto;
  token: string;
  isMfaValidated: true;
};

export type EnrollMfaResponse = {
  qrCode: string; // base64 ou data URI (conforme backend)
  secret: string;
  factorId: string;
};

export type UnenrollMfaResponse = {
  success: boolean;
};

export const AuthService = {
  // se hasMFA = true: { user, token, isMfaValidated: false, factorId }
  // se sem MFA: { user, token, isMfaValidated: true }
  async login(credential: AuthDto): Promise<LoginResponse> {
    const res = await api.post(`${_ENDPOINT}/login`, credential);
    return res.data as LoginResponse;
  },

  // verifica o código MFA
  async verifyMfa(payload: { factorId: string; code: string }): Promise<VerifyMfaResponse> {
    const res = await api.post(`${_ENDPOINT}/mfa/verify`, payload);
    return res.data as VerifyMfaResponse;
  },

  // gera QR code e secret
  async enrollMfa(): Promise<EnrollMfaResponse> {
    const res = await api.post(`${_ENDPOINT}/mfa/enroll`);
    return res.data as EnrollMfaResponse;
  },

  // remove o fator MFA
  async unenrollMfa(payload: { factorId: string }): Promise<UnenrollMfaResponse> {
    const res = await api.delete(`${_ENDPOINT}/mfa/unenroll`, { data: payload });
    return res.data as UnenrollMfaResponse;
  },

  async listMfaFactors(): Promise<MfaFactor[]> {
    const res = await api.get(`${_ENDPOINT}/mfa/factors`);
    return res.data as MfaFactor[];
  },

  // exibir dados do usuário logado
  async getSupabaseUser(): Promise<SupabaseUser> {
    const res = await api.get(`${_ENDPOINT}/me`);
    return res.data as SupabaseUser;
  },
};
