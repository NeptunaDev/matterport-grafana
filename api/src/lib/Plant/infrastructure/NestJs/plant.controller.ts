import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlantFind } from '../../application/PlantFind/PlantFind';
import { PlantRemove } from '../../application/PlantRemove/PlantRemove';
import { PlantSave } from '../../application/PlantSave/PlantSave';
import { PlantNotFoundError } from '../../domain/PlantNotFoundError';
import { CreateBody, EditBody, FindOneParams, FindParams } from './Validations';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { PlantMatterportSidExisting } from '../../domain/PlantMatterportSidExisting';

@Controller('plant')
export class PlantController {
  constructor(
    @Inject('PlantFind') private readonly plantFind: PlantFind,
    @Inject('PlantRemove') private readonly plantRemove: PlantRemove,
    @Inject('PlantSave') private readonly plantSave: PlantSave,
  ) {}

  private managmentError(error: Error) {
    if (error instanceof PlantNotFoundError) {
      console.log(error.stack);
      throw new NotFoundException(error.message);
    } else if (error instanceof MissingFieldError) {
      console.log(error.stack);
      throw new BadRequestException(error.message);
    } else if (error instanceof PlantMatterportSidExisting) {
      console.log(error.stack);
      throw new BadRequestException(error.message);
    } else {
      console.log(error.message);
      throw error;
    }
  }

  @Get()
  async find(@Query() query: FindParams) {
    try {
      return (
        await this.plantFind.run(
          query.id,
          query.matterportSid,
          query.name,
          query.createdAt,
          query.updatedAt,
          query.deletedAt,
        )
      ).map((plant) => plant.mapToPrimitivesWithoutDeletedAt());
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      const { matterportSid, name } = body;
      return await this.plantSave.run(null, matterportSid, name);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      const { id } = params;
      const { matterportSid, name } = body;
      return await this.plantSave.run(id, matterportSid, name);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      const { id } = params;
      return await this.plantRemove.run(id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
