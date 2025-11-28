import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './baseInformation/news/news.module';
import { UnitsModule } from './baseInformation/units/units.module';
import { OrgansModule } from './baseInformation/organs/organs.module';
import { ClientsModule } from './baseInformation/clients/clients.module';
import { ServicesModule } from './baseInformation/services/services.module';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    AuthModule,
    UsersModule,
    NewsModule,
    UnitsModule,
    OrgansModule,
    ClientsModule,
    ServicesModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
