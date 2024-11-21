import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
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

  @IsString()
  @IsOptional()
  color?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  populateidType?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
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

  @IsString()
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

  @IsString()
  @IsOptional()
  color?: string;
}
