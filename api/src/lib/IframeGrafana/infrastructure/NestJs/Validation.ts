import {
  IsBooleanString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { BaseFindQueries } from 'src/lib/Shared/infrastrucure/NestJS/Validation';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindQueries extends BaseFindQueries {
  @IsString()
  @IsOptional()
  idPlant: string;

  @IsUrl()
  @IsOptional()
  url: string;

  @IsNumberString()
  @IsOptional()
  order: string;

  @IsBooleanString()
  @IsOptional()
  populateIdPlant: string;
}

export class CreateBody {
  @IsString()
  idPlant: string;

  @IsUrl()
  url: string;

  @IsNumber()
  order: number;
}

export class EditBody {
  @IsString()
  @IsOptional()
  idPlant: string;

  @IsUrl()
  @IsOptional()
  url: string;

  @IsNumber()
  @IsOptional()
  order: number;
}
