import { Component, Inject } from '@angular/core';
import {
    IonicPage,
    NavController,
    NavParams,
    AlertController,
    ModalController
} from 'ionic-angular';
import { FormGroup, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SELECT_HAZARDOUS_SUBSTANCE_PAGE, SELECT_ENTITY_MODAL_PAGE } from '../pages.constants';
import {
    HazardousSubstance,
    Settings,
    Plant,
    Proc,
    Procedure,
    Scope,
    Material,
    Purpose,
    Syncable
} from '../../interfaces/interfaces';
import { tap } from 'rxjs/operators';
import { APP_CONFIG } from '../../app/app.config';
import { UnitOfWork, EMKGProvider } from '../../providers/providers';
import { Observable } from 'rxjs/Observable';
import { Usage } from '../../interfaces/usage/usage';
/**
 * Generated class for the AddUsagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-add-usage',
    templateUrl: 'add-usage.html'
})
export class AddUsagePage {
    public hazardousSubstance: HazardousSubstance;
    public usage: FormGroup;
    public units: string[] = ['mg', 'g', 'kg', 't', 'ml', 'l'];

    constructor(
        @Inject(APP_CONFIG) private appConfig: Settings,
        public navController: NavController,
        public navParams: NavParams,
        public fb: FormBuilder,
        private alertController: AlertController,
        private modalController: ModalController,
        private unitOfWork: UnitOfWork,
        public EMGK: EMKGProvider
    ) {
        this.usage = this.fb.group({
            plants: this.fb.array([], Validators.required),
            procedure: null,
            scope: [null, Validators.required],
            purpose: [null, Validators.required],
            material: [null, Validators.required],
            proc: [null, Validators.required],
            emkgSkin: this.fb.group({
                area: [0, Validators.required],
                duration: [0, Validators.required]
            }),
            emkgInhalation: this.fb.group({
                quantity: [0, Validators.required],
                release: [0, Validators.required]
            }),
            emkgFire: this.fb.group({
                quantity: [0, Validators.required],
                release: [0, Validators.required]
            })
        });
    }

    public addPlant(): void {
        const selectModal = this.modalController.create(SELECT_ENTITY_MODAL_PAGE, {
            label: 'Anlage',
            entities: this.plants
        });
        selectModal.onDidDismiss((response?: Plant) => {
            if (response) {
                const plants = this.usage.get('plants') as FormArray;
                const newPlant = this.createPlantControl();
                newPlant.get('plant').patchValue(response);
                plants.push(newPlant);
            }
        });
        selectModal.present();
    }

    public removePlant(index: number): void {
        const plants = this.usage.get('plants') as FormArray;
        plants.removeAt(index);
    }

    public selectUsageEntity<T>(control: AbstractControl, entities: T[], label: string) {
        const selectModal = this.modalController.create(SELECT_ENTITY_MODAL_PAGE, {
            label: label,
            entities: entities
        });
        selectModal.onDidDismiss((response?: T) => {
            if (response) control.patchValue(response);
        });
        selectModal.present();
    }

    public get plantControls(): AbstractControl[] {
        return (<FormArray>this.usage.get('plants')).controls;
    }

    public get plants(): Observable<Plant[]> {
        return this.unitOfWork.plantRepository.all();
    }

    public get procs(): Observable<Proc[]> {
        return this.unitOfWork.procRepository.all();
    }

    public get procedures(): Observable<Procedure[]> {
        return this.unitOfWork.procedureRepository.all();
    }
    public get scopes(): Observable<Scope[]> {
        return this.unitOfWork.scopeRepository.all();
    }
    public get materials(): Observable<Material[]> {
        return this.unitOfWork.materialRepository.all();
    }
    public get purposes(): Observable<Purpose[]> {
        return this.unitOfWork.purposeRepository.all();
    }

    public createPlantControl(): FormGroup {
        return this.fb.group({
            plant: [<Plant>null, Validators.required],
            amount: [null, Validators.required],
            unit: ['', Validators.required]
        });
    }

    public save(): void {
        const date = new Date().toISOString();

        const HsUsage = Object.assign(
            {
                hazardousSubstance: this.hazardousSubstance,
                created: date,
                updated: date
            },
            this.usage.value
        ) as Usage;

        this.unitOfWork.usageRepository.save(HsUsage).then(response => {
            this.unitOfWork
                .sync()
                .then(syncResponse => {
                    this.alertController
                        .create({
                            title: this.hazardousSubstance.name,
                            subTitle: 'Anwendung gespeichert',
                            message: syncResponse,
                            buttons: ['Juhu']
                        })
                        .present();
                })
                .catch(console.warn);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddUsagePage');
    }

    ionViewCanEnter(): boolean | Promise<HazardousSubstance[]> {
        const hazardousSubstance = this.navParams.get('hazardousSubstance');
        if (!hazardousSubstance) {
            if (this.appConfig.debugMode) {
                return this.unitOfWork.hazardousSubstanceRepository
                    .all()
                    .pipe(
                        tap(hazardousSubstances => {
                            this.hazardousSubstance = hazardousSubstances.shift();
                        })
                    )
                    .toPromise();
            }

            this.alertController
                .create({
                    title: 'Oops...',
                    subTitle: 'Bitte wählen Sie zuerst einen Gefahrstoff aus!',
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {
                                this.navController.push(SELECT_HAZARDOUS_SUBSTANCE_PAGE);
                            }
                        }
                    ]
                })
                .present();
            return false;
        }

        this.hazardousSubstance = hazardousSubstance;

        return true;
    }
}
