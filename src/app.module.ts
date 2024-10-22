import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorDashboardModule } from './vendorDashboard/vendorDashboard.module';
import { UserDashboardModule } from './userDashboard/userDashboard.modules';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './Guards/Authorization';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true ,envFilePath : './src/config/.env'}),
    MongooseModule.forRoot(process.env.DB_URL),
    ServeStaticModule.forRoot({ rootPath : join(__dirname , ".." , 'uploads')}),
    VendorDashboardModule,
    UserDashboardModule
  ],
  controllers: [],
  providers: [{ provide : APP_GUARD , useClass : RolesGuard}],
})
export class AppModule {}
