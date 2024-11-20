import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<MongoPlant>;

@Schema({ timestamps: true })
export class MongoPlant {
  @Prop({ required: true })
  matterportSid: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  deletedAt: Date;
}

export const PlantSchema = SchemaFactory.createForClass(MongoPlant);
