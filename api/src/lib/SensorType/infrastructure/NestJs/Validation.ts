import { IsOptional, IsString } from 'class-validator';
import { BaseFindQueries } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindQueries extends BaseFindQueries {
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
