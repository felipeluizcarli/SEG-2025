export interface UserDto {
    id?: string;
    name: string;
    email: string;
    supabaseId: string;
    hasMFA: boolean;

    factoryId?: string;
    isMFAValidated?: boolean;
    isFirstMFAAccess?: boolean;
}