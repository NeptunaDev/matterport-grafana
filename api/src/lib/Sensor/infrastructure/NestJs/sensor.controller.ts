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
import { SensorFind } from '../../application/SensorFind/SensorFind';
import { SensorSave } from '../../application/SensorSave/SensorSave';
import { SensorRemove } from '../../application/SensorRemove/SensorRemove';
import { SensorNotFoundError } from '../../domain/SensorNotFoundError';
import { DeviceNotFoundError } from 'src/lib/Device/domain/DeviceNotFoundError';
import { SensorTypeNotFoundError } from 'src/lib/SensorType/domain/SensorTypeNotFoundError';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { CreateBody, EditBody, FindOneParams, FindQueries } from './Validation';

@Controller('sensor')
export class SensorController {
  constructor(
    @Inject('SensorFind') private readonly sensorFind: SensorFind,
    @Inject('SensorSave') private readonly sensorSave: SensorSave,
    @Inject('SensorRemove') private readonly sensorRemove: SensorRemove,
  ) {}

  private managmentError(error: Error) {
    if (
      error instanceof SensorNotFoundError ||
      error instanceof DeviceNotFoundError ||
      error instanceof SensorTypeNotFoundError
    ) {
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
        await this.sensorFind.run(
          query.id,
          query.idType,
          query.idDevice,
          query.place,
          query.vector,
          query.title,
          query.description,
          query.color,
          query.createdAt,
          query.updatedAt,
          query.deletedAt,
          query.populateidType === 'true',
          query.populateidDevice === 'true',
        )
      ).map((sensor) => sensor.mapToPrimitivesWithoutDeletedAt());
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      await this.sensorSave.run(
        null,
        body.idType,
        body.idDevice,
        body.place,
        body.vector,
        body.title,
        body.description,
        body.color,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      await this.sensorSave.run(
        params.id,
        body.idType,
        body.idDevice,
        body.place,
        body.vector,
        body.title,
        body.description,
        body.color,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      await this.sensorRemove.run(params.id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
