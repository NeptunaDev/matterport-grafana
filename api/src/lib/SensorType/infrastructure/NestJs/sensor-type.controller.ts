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
import { SensorTypeFind } from '../../application/SensorTypeFind/SensorTypeFind';
import { SensorTypeSave } from '../../application/SensorTypeSave/SensorTypeSave';
import { SensorTypeRemove } from '../../application/SensorTypeRemove/SensorTypeRemove';
import { SensorTypeNotFoundError } from '../../domain/SensorTypeNotFoundError';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { CreateBody, EditBody, FindOneParams, FindQueries } from './Validate';

@Controller('sensor-type')
export class SensorTypeController {
  constructor(
    @Inject('SensorTypeFind') private readonly sensorTypeFind: SensorTypeFind,
    @Inject('SensorTypeSave') private readonly sensorTypeSave: SensorTypeSave,
    @Inject('SensorTypeRemove')
    private readonly sensorTypeRemove: SensorTypeRemove,
  ) {}

  private managmentError(error: Error) {
    if (error instanceof SensorTypeNotFoundError) {
      console.log(error.stack);
      throw new NotFoundException(error.message);
    } else if (error instanceof MissingFieldError) {
      console.log(error.stack);
      throw new BadRequestException(error.message);
    } else {
      console.log(error.message);
      throw error;
    }
  }

  @Get()
  async find(@Query() query: FindQueries) {
    try {
      return (
        await this.sensorTypeFind.run(
          query.id,
          query.type,
          new Date(query.createdAt),
          new Date(query.updatedAt),
          new Date(query.deletedAt),
        )
      ).map((sensorType) => sensorType.mapToPrimitivesWithoutDeletedAt());
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      await this.sensorTypeSave.run(null, body.type);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      await this.sensorTypeSave.run(params.id, body.type);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      await this.sensorTypeRemove.run(params.id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
