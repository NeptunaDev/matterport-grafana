import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoPlant } from 'src/lib/Plant/infrastructure/Mongo/MongoPlantSchema';

export type DeviceDocument = HydratedDocument<MongoDevice> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'devices' })
export class MongoDevice {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MongoPlant.name,
    required: true,
  })
  idPlant: MongoPlant;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  tag: string;

  @Prop([Number])
  place: number[];

  @Prop({ required: true })
  condition: boolean;

  @Prop({ default: null })
  deletedAt: Date;
}

export const DeviceSchema = SchemaFactory.createForClass(MongoDevice);
