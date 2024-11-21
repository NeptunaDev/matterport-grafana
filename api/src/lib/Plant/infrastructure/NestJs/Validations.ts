import { IsOptional, IsString } from 'class-validator';
import { BaseFindQueries } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindQueries extends BaseFindQueries {
  @IsString()
  @IsOptional()
  matterportSid: string;

  @IsString()
  @IsOptional()
  name: string;
}

export class CreateBody {
  @IsString()
  matterportSid: string;

  @IsString()
  name: string;
}

export class EditBody {
  @IsString()
  @IsOptional()
  matterportSid: string;

  @IsString()
  @IsOptional()
  name: string;
}
