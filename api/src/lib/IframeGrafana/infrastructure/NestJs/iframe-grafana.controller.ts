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
import { IframeGrafanaFind } from '../../application/IframeGrafanaFind/IframeGrafanaFind';
import { IframeGrafanaRemove } from '../../application/IframeGrafanaRemove/IframeGrafanaRemove';
import { IframeGrafanaSave } from '../../application/IframeGrafanaSave/IframeGrafanaSave';
import { IframeGrafanaNotFoundError } from '../../domain/IframeGrafanaNotFoundError';
import { PlantNotFoundError } from 'src/lib/Plant/domain/PlantNotFoundError';
import { MissingFieldError } from 'src/lib/Shared/domain/MissingFieldError';
import { CreateBody, EditBody, FindOneParams, FindQueries } from './Validation';
import {
  IframeGrafanaCreateDto,
  IframeGrafanaFindDto,
  IframeGrafanaUpdateDto,
} from '../../domain/IframeGrafana.dto';

@Controller('iframe-grafana')
export class IframeGrafanaController {
  constructor(
    @Inject('IframeGrafanaFind')
    private readonly iframeGrafanaFind: IframeGrafanaFind,
    @Inject('IframeGrafanaRemove')
    private readonly iframeGrafanaRemove: IframeGrafanaRemove,
    @Inject('IframeGrafanaSave')
    private readonly iframeGrafanaSave: IframeGrafanaSave,
  ) {}

  private managmentError(error: Error) {
    if (
      error instanceof IframeGrafanaNotFoundError ||
      error instanceof PlantNotFoundError
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
      const iframeGrafanaFindDto = new IframeGrafanaFindDto({
        createdAt: queries.createdAt ? new Date(queries.createdAt) : null,
        deletedAt: queries.deletedAt ? new Date(queries.deletedAt) : null,
        id: queries.id,
        idPlant: queries.idPlant,
        order: queries.order ? parseInt(queries.order) : null,
        updatedAt: queries.updatedAt ? new Date(queries.updatedAt) : null,
        url: queries.url,
        populateIdPlant: queries.populateIdPlant === 'true',
      });
      return (await this.iframeGrafanaFind.run(iframeGrafanaFindDto)).map(
        (dataSensor) => dataSensor.mapToPrimitivesWithoutDeletedAt(),
      );
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Post()
  async create(@Body() body: CreateBody) {
    try {
      const iframeGrafanaCreateDto = new IframeGrafanaCreateDto({
        idPlant: body.idPlant,
        order: body.order,
        url: body.url,
      });
      await this.iframeGrafanaSave.run(iframeGrafanaCreateDto);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Patch(':id')
  async edit(@Param() params: FindOneParams, @Body() body: EditBody) {
    try {
      const iframeGrafanaUpdateDto = new IframeGrafanaUpdateDto({
        id: params.id,
        ...(body.idPlant && { idPlant: body.idPlant }),
        ...(body.order && { order: body.order }),
        ...(body.url && { url: body.url }),
      });
      await this.iframeGrafanaSave.run(iframeGrafanaUpdateDto);
    } catch (error) {
      throw this.managmentError(error);
    }
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParams) {
    try {
      await this.iframeGrafanaRemove.run(params.id);
    } catch (error) {
      throw this.managmentError(error);
    }
  }
}
