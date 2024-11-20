import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlantModule } from './lib/Plant/infrastructure/NestJs/plant.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/prueba_api?authSource=admin',
    ),
    PlantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
