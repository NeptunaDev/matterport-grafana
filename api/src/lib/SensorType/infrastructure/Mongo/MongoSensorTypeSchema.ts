import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorTypeDocuemnt = HydratedDocument<MongoSensorType> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'sensor_types' })
export class MongoSensorType {
  @Prop({ required: true })
  type: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const SensorTypeSchema = SchemaFactory.createForClass(MongoSensorType);
