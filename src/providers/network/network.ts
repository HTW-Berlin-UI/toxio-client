import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the NetworkProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkProvider {
    public get isOnline(): boolean {
        return this.network.type !== 'none';
    }

    constructor(private network: Network, private toastCtrl: ToastController) {
        this.network.onConnect().subscribe(() => {
            setTimeout(() => {
                this.toastCtrl
                    .create({
                        message: 'Online! Daten werden synchronisiert... 👍 ',
                        duration: 3000,
                        position: 'bottom'
                    })
                    .present();
            }, 3000);
        });
        this.network.onDisconnect().subscribe(() => {
            this.toastCtrl
                .create({
                    message: 'Netzwerkverbidung verloren 😱',
                    duration: 3000,
                    position: 'bottom'
                })
                .present();
        });
    }
}
