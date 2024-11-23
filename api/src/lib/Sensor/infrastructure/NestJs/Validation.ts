import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBooleanString,
  IsHexColor,
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
  idType?: string;

  @IsString()
  @IsOptional()
  idDevice?: string;

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
  vector: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsBooleanString()
  @IsOptional()
  populateidType?: string;

  @IsBooleanString()
  @IsOptional()
  populateidDevice?: string;
}

export class CreateBody {
  @IsString()
  idType?: string;

  @IsString()
  idDevice?: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  place: Coordinates;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  vector: Coordinates;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsHexColor()
  color?: string;
}

export class EditBody {
  @IsString()
  @IsOptional()
  idType?: string;

  @IsString()
  @IsOptional()
  idDevice?: string;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsOptional()
  place: Coordinates;

  @IsArray()
  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsNumber({}, { each: true })
  @IsOptional()
  vector: Coordinates;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsHexColor()
  @IsOptional()
  color?: string;
}
