import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlantDocument = HydratedDocument<MongoPlant> & {
  createdAt: Date;
  updatedAt: Date;
};

@Schema({ timestamps: true, collection: 'plants' })
export class MongoPlant {
  @Prop({ required: true, unique: true })
  matterportSid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  deletedAt: Date;
}

export const PlantSchema = SchemaFactory.createForClass(MongoPlant);
