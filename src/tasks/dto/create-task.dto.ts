import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

/**
 * DTO -> Data Transfer Object (Objeto de Transferência de Dados)
 * -> Validar dados, transformar dados
 * -> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */
export class CreateTaskDto {
  @IsString({  message: "O nome da tarefa deve ser uma string!" })
  @MinLength(5, { message: "O nome deve ter no mínimo 5 caracteres!" })
  @IsNotEmpty({ message: "O nome da tarefa é obrigatório!" })
  readonly name: string;
  
  @IsString({  message: "A descrição da tarefa deve ser uma string!" })
  @MaxLength(200, { message: "A descrição deve ter no máximo 10 caracteres!" })
  @IsNotEmpty({ message: "A descrição da tarefa é obrigatória!" })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}