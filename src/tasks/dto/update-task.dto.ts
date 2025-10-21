import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";

/**
 * DTO -> Data Transfer Object (Objeto de Transferência de Dados)
 * -> Validar dados, transformar dados
 * -> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean({ message: "O campo completed deve ser um boolean!" })
  @IsOptional()
  readonly completed?: boolean;
}