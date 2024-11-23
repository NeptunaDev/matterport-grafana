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
import { DataSensorFind } from '../../application/DataSensorFind/DataSensorFind';
import { DataSensorSave } from '../../application/DataSensorSave/DataSensorSave';
import { DataSensorRemove } from '../../application/DataSensorRemove/DataSensorRemove';
import { SensorNotFoundError } from 'src/lib/Sensor/domain/SensorNotFoundError';
import { DataSensorNotFoundError } from '../../domain/DataSensorNotFoundError';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { CreateBody, EditBody, FindOneParams, FindQueries } from './Validation';

@Controller('data-sensor')
export class DataSensorController {
  constructor(
    @Inject('DataSensorFind') private readonly dataSensorFind: DataSensorFind,
    @Inject('DataSensorSave') private readonly dataSensorSave: DataSensorSave,
    @Inject('DataSensorRemove')
    private readonly dataSensorRemove: DataSensorRemove,
  ) {}

  private managmentError(error: Error) {
    if (
      error instanceof SensorNotFoundError ||
      error instanceof DataSensorNotFoundError
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
  async find(@Query() queries: FindQueries) {
    try {
      return (
        await this.dataSensorFind.run(
          queries.id,
          queries.sensorId,
          queries.variable,
          queries.value ? parseFloat(queries.value) : null,
          queries.unit,
          queries.createdAt ? new Date(queries.createdAt) : null,
          queries.updatedAt ? new Date(queries.updatedAt) : null,
          queries.deletedAt ? new Date(queries.deletedAt) : null,
          queries.populateidSensor === 'true',
        )
      ).map((dataSensor) => dataSensor.mapToPrimitivesWithoutDeletedAt());
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      await this.dataSensorSave.run(
        null,
        body.sensorId,
        body.variable,
        body.value,
        body.unit,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      await this.dataSensorSave.run(
        params.id,
        body.sensorId,
        body.variable,
        body.value,
        body.unit,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      await this.dataSensorRemove.run(params.id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
