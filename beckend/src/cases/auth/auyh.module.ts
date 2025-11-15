import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { AuthController } from "./auyh.controles";
import { AuthService } from "./auyh.service";

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}