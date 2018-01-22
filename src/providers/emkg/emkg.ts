import { Injectable } from '@angular/core';

/*
  Generated class for the EmkgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EMKGProvider {
    public skin = {
        area: {
            label: 'Wirkfläche',
            options: [
                {
                    label: 'Klein',
                    code: 'SMALL',
                    descriptions: ['Kleinflächige Benetzung (Spritzer)']
                },
                {
                    label: 'Groß',
                    code: 'LARGE',
                    descriptions: ['Großflächige Benetzung (z.B. ganze Hand)']
                }
            ]
        },
        duration: {
            label: 'Wirkdauer',
            options: [
                {
                    label: 'Kurz',
                    code: 'short',
                    descriptions: ['Unter 15 min/Tag']
                },
                {
                    label: 'Lang',
                    code: 'long',
                    descriptions: ['Über 15 min/Tag']
                }
            ]
        }
    };
    public inhalation = {
        quantity: {
            label: 'Verwendete Menge',
            options: [
                {
                    label: 'Gering',
                    code: 'LOW',
                    descriptions: ['Gramm- bzw. Milliliter-Bereich']
                },
                {
                    label: 'Mittel',
                    code: 'MEDIUM',
                    descriptions: ['Kilogramm- bzw. Liter-Bereich']
                },
                {
                    label: 'Hoch',
                    code: 'HIGH',
                    descriptions: ['Tonnen- bzw. Kubikmeter-Bereich']
                }
            ]
        },
        release: {
            label: 'Freisetzungsgruppe',
            options: [
                {
                    label: 'Niedrig',
                    code: 'LOW',
                    descriptions: [
                        'Feststoffe wie Granulat, Wachs, Pellets ohne Abrieb, Korngröße >1 mm',
                        'Flüssigkeiten mit einem Siedepunkt > 150°C bei 20°C',
                        'Wässrige Lösungen'
                    ]
                },
                {
                    label: 'Mittel',
                    code: 'MEDIUM',
                    descriptions: [
                        'Körnige Feststoffe mit Staub der sich nach einiger Zeit absetzt z.B. Zucker, Waschpulver (0,5 mm > Korngröße < 1 mm)',
                        'Flüssigkeiten mit einem Siedepunkt > 50°C < 150°C bei 20°C'
                    ]
                },
                {
                    label: 'Hoch',
                    code: 'HIGH',
                    descriptions: [
                        'Feststoffe mit feinpulvrigem Staub, der einige Minuten in der Luft bleibt z.B. Mehl, Toner (Korngröße < 0,5 mm)',
                        'Flüssigkeiten mit einem Siedepunkt < 50°C bei 20°C',
                        'Aerosole'
                    ]
                }
            ]
        }
    };

    public fire = {
        airSupply: {
            label: 'Luftversorgung',
            options: [
                {
                    label: 'Gering',
                    code: 'LOW',
                    descriptions: ['Ungenügend']
                },
                {
                    label: 'Mittel',
                    code: 'MEDIUM',
                    descriptions: ['Allgemein']
                },
                {
                    label: 'Hoch',
                    code: 'HIGH',
                    descriptions: ['Technische Absaugung']
                },
                {
                    label: 'Egal',
                    code: 'HIGH',
                    descriptions: ['Geschlossenes System']
                }
            ]
        },
        quantity: {
            label: 'Verwendete Menge',
            options: [
                {
                    label: 'Gering',
                    code: 'LOW',
                    descriptions: ['Gramm- bzw. Milliliter-Bereich']
                },
                {
                    label: 'Mittel',
                    code: 'MEDIUM',
                    descriptions: ['Kilogramm- bzw. Liter-Bereich']
                },
                {
                    label: 'Hoch',
                    code: 'HIGH',
                    descriptions: ['Tonnen- bzw. Kubikmeter-Bereich']
                }
            ]
        },
        release: {
            label: 'Freisetzungsgruppe',
            options: [
                {
                    label: 'Niedrig',
                    code: 'LOW',
                    descriptions: [
                        'Feststoffe wie Granulat, Wachs, Pellets ohne Abrieb, Korngröße >1 mm',
                        'Flüssigkeiten mit einem Siedepunkt > 150°C bei 20°C',
                        'Wässrige Lösungen'
                    ]
                },
                {
                    label: 'Mittel',
                    code: 'MEDIUM',
                    descriptions: [
                        'Körnige Feststoffe mit Staub der sich nach einiger Zeit absetzt z.B. Zucker, Waschpulver (0,5 mm > Korngröße < 1 mm)',
                        'Flüssigkeiten mit einem Siedepunkt > 50°C < 150°C bei 20°C'
                    ]
                },
                {
                    label: 'Hoch',
                    code: 'HIGH',
                    descriptions: [
                        'Feststoffe mit feinpulvrigem Staub, der einige Minuten in der Luft bleibt z.B. Mehl, Toner (Korngröße < 0,5 mm)',
                        'Flüssigkeiten mit einem Siedepunkt < 50°C bei 20°C',
                        'Aerosole'
                    ]
                }
            ]
        }
    };

    constructor() { }
}
