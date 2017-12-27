import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Network } from '@ionic-native/network';
import { QRScanner } from '@ionic-native/qr-scanner';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { AppConfig } from './app.config';
import { Toxio } from './app.component';
import { ToxioErrorHandler } from '../models/models';
import {
    DataExchangeProvider,
    NetworkProvider,
    QRCodeProvider,
    UnitOfWork,
    DbContext,
    HazardousSubstanceRepository,
    MaterialRepository,
    ProcRepository,
    ProcedureRepository,
    ScopeRepository,
    PlantRepository,
    PurposeRepository,
    SafetyDataSheetProvider
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
        SafetyDataSheetProvider,
        DataExchangeProvider,
        NetworkProvider,
        UnitOfWork,
        DbContext,
        HazardousSubstanceRepository,
        MaterialRepository,
        ProcRepository,
        ProcedureRepository,
        ScopeRepository,
        PlantRepository,
        PurposeRepository,
        QRCodeProvider,
        QRScanner,
        DocumentViewer,
        SocialSharing,
        File,
        { provide: ErrorHandler, useClass: ToxioErrorHandler }
    ]
})
export class AppModule {}
