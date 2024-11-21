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
import { BaseFindParams } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindParams extends BaseFindParams {
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
