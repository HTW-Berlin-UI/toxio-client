import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
    currentUser: {
        can: {
            addUsage: true
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
export class AppConfig {
    currentUser: {
        can: {
            addUsage: boolean;
        };
    };
}
