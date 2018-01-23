import { Injectable } from '@angular/core';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { HazardousSubstance } from '../../interfaces/interfaces';
import { File } from '@ionic-native/file';

/*
  Generated class for the SafetyDataSheetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SafetyDataSheetProvider {
    constructor(private documentViewer: DocumentViewer, private fileSystem: File) {}

    public openSafetyDataSheet(hazardousSubstance: HazardousSubstance): void {
        const path = `${this.fileSystem.applicationDirectory}www/assets/sds/`;
        const file = `sds_substance_${hazardousSubstance.substanceID}.pdf`;
        console.log('try open file', path + file);

        /**
         * Check if the file exists
         */
        // this.fileSystem
        //     .checkFile(path, file)
        //     .then(_ => console.log('Directory exists'))
        //     .catch(err => console.log(`Directory doesnt exist: ${path}${file}`));

        /**
         * open pdf with document viewer
         */
        this.documentViewer.viewDocument(path + file, 'application/pdf', {
            title: ` ${hazardousSubstance.name}`
        });
    }
}
