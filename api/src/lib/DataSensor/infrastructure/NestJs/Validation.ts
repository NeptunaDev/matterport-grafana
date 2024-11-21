import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsNumber()
  @IsOptional()
  value: number;

  @IsString()
  @IsOptional()
  unit: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
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
