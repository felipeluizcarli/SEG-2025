export interface userDTO {
    id: string;
    name: string;
    email: string;
    supabaseId: string;
    hasMFA: boolean;

    factoryId?: string;
    isMfaValidated?: boolean;
    isFirstMfaAccess?: boolean;
    
    
}