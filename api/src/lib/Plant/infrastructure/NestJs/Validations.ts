import { IsOptional, IsString } from 'class-validator';
import { BaseFindParams } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindParams extends BaseFindParams {
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
