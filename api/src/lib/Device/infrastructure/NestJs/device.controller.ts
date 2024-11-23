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
import { DeviceFind } from '../../application/DeviceFind/DeviceFind';
import { DeviceSave } from '../../application/DeviceSave/DeviceSave';
import { DeviceRemove } from '../../application/DeviceRemove/DeviceRemove';
import { PlantNotFoundError } from 'src/lib/Plant/domain/PlantNotFoundError';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { DeviceNotFoundError } from '../../domain/DeviceNotFoundError';
import { CreateBody, EditBody, FindOneParams, FindQueries } from './Validation';
import { Coordinates } from 'src/lib/Shared/domain/Coordinates';

@Controller('device')
export class DeviceController {
  constructor(
    @Inject('DeviceFind') private readonly deviceFind: DeviceFind,
    @Inject('DeviceSave') private readonly deviceSave: DeviceSave,
    @Inject('DeviceRemove') private readonly deviceRemove: DeviceRemove,
  ) {}

  private managmentError(error: Error) {
    if (error instanceof PlantNotFoundError) {
      console.log(error.stack);
      throw new NotFoundException(error.message);
    } else if (error instanceof DeviceNotFoundError) {
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
        await this.deviceFind.run(
          query.id,
          query.idPlant,
          query.name,
          query.description,
          query.tag,
          query.place
            ?.replace('[', '')
            .replace(']', '')
            .split(',')
            .map((n) => Number(n)) as Coordinates,
          query.condition && query.condition === 'true',
          query.createdAt ? new Date(query.createdAt) : null,
          query.updatedAt ? new Date(query.updatedAt) : null,
          query.deletedAt ? new Date(query.deletedAt) : null,
          query.populateIdPlant === 'true',
        )
      ).map((device) => device.mapToPrimitivesWithoutDeletedAt());
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      await this.deviceSave.run(
        null,
        body.idPlant,
        body.name,
        body.description,
        body.tag,
        body.place,
        body.condition,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      await this.deviceSave.run(
        params.id,
        body.idPlant,
        body.name,
        body.description,
        body.tag,
        body.place,
        body.condition,
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      await this.deviceRemove.run(params.id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
