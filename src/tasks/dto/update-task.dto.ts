/**
 * DTO -> Data Transfer Object (Objeto de Transferência de Dados)
 * -> Validar dados, transformar dados
 * -> Se usa para representar quais dados e em que formatos uma determinada camada aceita e trabalha
 */
export class UpdateTaskDto {
  readonly name?: string;
  readonly description?: string;
  readonly completed?: boolean;
}