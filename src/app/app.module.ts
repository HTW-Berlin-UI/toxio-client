import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { AppConfig } from './app.config';
import { Toxio } from './app.component';
import { ToxioErrorHandler } from '../models/models';
import { Pro } from '@ionic/pro';
import {
    DataExchangeProvider,
    NetworkProvider,
    QrCodeProvider,
    UnitOfWork,
    DbContext,
    HazardousSubstanceRepository
} from '../providers/providers';

@NgModule({
    declarations: [Toxio],
    imports: [
        BrowserModule,
        IonicModule.forRoot(Toxio),
        HttpClientModule,
        IonicStorageModule.forRoot(),
        AppConfig
    ],
    bootstrap: [IonicApp],
    entryComponents: [Toxio],
    providers: [
        StatusBar,
        SplashScreen,
        IonicErrorHandler,
        Network,
        DataExchangeProvider,
        NetworkProvider,
        UnitOfWork,
        DbContext,
        HazardousSubstanceRepository,
        QrCodeProvider,
        { provide: ErrorHandler, useClass: ToxioErrorHandler }
    ]
})
export class AppModule {}
