import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the SelectEntityModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-select-entity-modal',
    templateUrl: 'select-entity-modal.html'
})
export class SelectEntityModalPage<T> {
    public label: string;
    public entities: Observable<T[]>;
    public textFilter: string;

    constructor(public viewController: ViewController, public navParams: NavParams) {}

    public search(event: Event): void {
        this.textFilter = (<HTMLInputElement>event.target).value;
    }

    public dismiss(entity?: T) {
        this.viewController.dismiss(entity);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectEntityModalPage');
    }

    ionViewCanEnter(): boolean {
        this.label = this.navParams.get('label');
        this.entities = this.navParams.get('entities');

        return !!this.label && !!this.entities;
    }
}
