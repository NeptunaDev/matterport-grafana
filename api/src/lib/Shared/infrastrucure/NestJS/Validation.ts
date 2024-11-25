import { IsDateString, IsOptional, IsString } from 'class-validator';

export class BaseFindQueries {
  @IsString()
  @IsOptional()
  id: string;

  @IsDateString()
  @IsOptional()
  createdAt: string;

  @IsDateString()
  @IsOptional()
  updatedAt: string;

  @IsDateString()
  @IsOptional()
  deletedAt: string;
}
