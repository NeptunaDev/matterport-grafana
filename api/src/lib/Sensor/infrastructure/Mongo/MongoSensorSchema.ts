import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoDevice } from 'src/lib/Device/infrastructure/Mongo/MongoDeviceSchema';
import { MongoSensorType } from 'src/lib/SensorType/infrastructure/Mongo/MongoSensorTypeSchema';

export type SensorDocument = HydratedDocument<MongoSensor> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'sensors' })
export class MongoSensor {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MongoSensorType.name,
    required: true,
  })
  idType: MongoSensorType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: MongoDevice.name,
    required: true,
  })
  idDevice: MongoDevice;

  @Prop([Number])
  place: number[];

  @Prop([Number])
  vector: number[];

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  color: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const SensorSchema = SchemaFactory.createForClass(MongoSensor);
