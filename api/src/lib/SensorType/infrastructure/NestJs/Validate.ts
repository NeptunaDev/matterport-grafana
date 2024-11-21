import { IsOptional, IsString } from 'class-validator';
import { BaseFindParams } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindParams extends BaseFindParams {
  @IsString()
  @IsOptional()
  type: string;
}

export class CreateBody {
  @IsString()
  type: string;
}

export class EditBody {
  @IsString()
  type: string;
}
