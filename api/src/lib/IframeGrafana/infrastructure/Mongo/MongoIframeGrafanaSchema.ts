import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoPlant } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';

export type MongoIframeGrafanaDocumet = HydratedDocument<MongoIframeGrafana> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'iframe_grafanas' })
export class MongoIframeGrafana {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MongoPlant.name,
    required: true,
  })
  idPlant: MongoPlant;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  order: number;

  @Prop({ default: null })
  deletedAt: Date;
}

export const IframeGrafanaSchema =
  SchemaFactory.createForClass(MongoIframeGrafana);
