import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsBooleanString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';
import { BaseFindQueries } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindQueries extends BaseFindQueries {
  @IsString()
  @IsOptional()
  idPlant: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  tag: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map((n) => {
            if (isNaN(Number(n))) {
              throw new Error('Invalid number');
            }
            return Number(n);
          })
      : value,
  )
  place: string;

  @IsBooleanString()
  @IsOptional()
  condition: string;

  @IsBooleanString()
  @IsOptional()
  populateIdPlant: string;
}

export class CreateBody {
  @IsString()
  idPlant: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  tag: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  place: Coordinates;

  @IsBoolean()
  condition: boolean;
}

export class EditBody {
  @IsString()
  @IsOptional()
  idPlant: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  tag: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsOptional()
  place: Coordinates;

  @IsBoolean()
  @IsOptional()
  condition: boolean;
}
