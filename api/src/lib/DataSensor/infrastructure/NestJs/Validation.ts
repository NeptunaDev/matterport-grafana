import {
  IsBooleanString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseFindQueries } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindQueries extends BaseFindQueries {
  @IsString()
  @IsOptional()
  sensorId: string;

  @IsString()
  @IsOptional()
  variable: string;

  @IsNumberString()
  @IsOptional()
  value: string;

  @IsString()
  @IsOptional()
  unit: string;

  @IsBooleanString()
  @IsOptional()
  populateidSensor?: string;
}

export class CreateBody {
  @IsString()
  sensorId: string;

  @IsString()
  variable: string;

  @IsNumber()
  value: number;

  @IsString()
  unit: string;
}

export class EditBody {
  @IsString()
  @IsOptional()
  sensorId: string;

  @IsString()
  @IsOptional()
  variable: string;

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  unit: string;
}
