import { NgModule, InjectionToken } from '@angular/core';
import { Settings } from '../interfaces/interfaces';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: Settings = {
    debugMode: true,
    apiUrl: 'http://141.45.92.217/api',
    current: {
        user: {
            can: {
                addUsage: true
            }
        },
        organization: {
            id: 19
        },
        unit: {
            id: 162
        }
    }
};

@NgModule({
    providers: [
        {
            provide: APP_CONFIG,
            useValue: APP_DI_CONFIG
        }
    ]
})
export class AppConfig implements Settings {}
