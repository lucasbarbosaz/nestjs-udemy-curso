import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDto {
  @IsOptional() // indica que o campo é opcional
  @Min(0) // valor mínimo 0
  @Max(50) // valor máximo 50
  @IsInt() // garante que o valor é um número inteiro
  @Type(() => Number) // transforma o valor para number
  limit: number;

  @IsOptional() // indica que o campo é opcional
  @IsInt() // garante que o valor é um número inteiro
  @Min(0) // valor mínimo 0
  @Type(() => Number) // transforma o valor para number
  offset: number;
}