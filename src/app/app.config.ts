import { NgModule, InjectionToken } from '@angular/core';
import { Settings } from '../interfaces/interfaces';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: Settings = {
    debugMode: true,
    current: {
        user: {
            can: {
                addUsage: true
            }
        },
        organization: {
            id: 1
        },
        unit: {
            id: 2
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
