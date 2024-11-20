import { IsDate, IsOptional, IsString } from 'class-validator';

export class FindOneParams {
  @IsString()
  id: string;
}

export class FindParams {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  matterportSid: string;

  @IsString()
  @IsOptional()
  name: string;

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
