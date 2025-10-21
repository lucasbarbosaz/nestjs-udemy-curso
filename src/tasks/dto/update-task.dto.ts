import { IsBoolean, IsOptional, IsString } from "class-validator";

/**
 * DTO -> Data Transfer Object (Objeto de Transferência de Dados)
 * -> Validar dados, transformar dados
 * -> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */
export class UpdateTaskDto {
  @IsString({ message: "O nome da tarefa deve ser uma string!" })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: "O nome da tarefa deve ser uma string!" })
  @IsOptional()
  readonly description?: string;

  @IsBoolean({ message: "O campo completed deve ser um boolean!" })
  @IsOptional()
  readonly completed?: boolean;
}