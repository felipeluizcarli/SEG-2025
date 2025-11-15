//backend/src/cases/auth/dtos/auth.dto.ts

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}


//backend/src/cases/auth/dtos/mfa.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class MfaSetupDTO {
    @IsEmail()
    email: string;
}

export class MfaCompleteDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    mfaSetupToken: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string;
}

export class MfaValidateDTO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    code: string;
}