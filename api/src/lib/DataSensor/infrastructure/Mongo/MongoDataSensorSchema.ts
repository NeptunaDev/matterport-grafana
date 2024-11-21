import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MongoSensor } from 'src/lib/Sensor/infrastructure/Mongo/MongoSensorSchema';

export type DataSensorDocument = HydratedDocument<MongoDataSensor> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'data_sensors' })
export class MongoDataSensor {
  @Prop({
    type: mongoose.Schema.ObjectId,
    ref: MongoSensor.name,
    required: true,
  })
  idSensor: MongoSensor;

  @Prop({ required: true })
  variable: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const DataSensorSchema = SchemaFactory.createForClass(MongoDataSensor);
