import { IsDate, IsOptional, IsString } from 'class-validator';

export class BaseFindQueries {
  @IsString()
  @IsOptional()
  id: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
