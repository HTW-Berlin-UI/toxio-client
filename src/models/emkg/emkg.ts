export class EMKG {
    static SKIN = [
        {
            label: 'Wirkdauer',
            options: [
                {
                    label: 'kurz',
                    code: 'short',
                    description: 'unter 15 min/Tag'
                },
                {
                    label: 'lang',
                    code: 'long',
                    description: 'über 15 min/Tag'
                }
            ]
        },
        {
            label: 'Wirkfläche',
            options: [
                {
                    label: 'klein',
                    code: 'SMALL',
                    description: 'kleinflächige Benetzung (Spritzer)'
                },
                {
                    label: 'groß',
                    code: 'LARGE',
                    description: 'großflächige Benetzung (z.B. ganze Hand)'
                }
            ]
        }
    ];
    static INHALATION = [
        {
            label: 'Verwendete Menge',
            options: [
                {
                    label: 'gering',
                    code: 'LOW',
                    description: 'Gramm- bzw. Milliliter-Bereich'
                },
                {
                    label: 'mittel',
                    code: 'MEDIUM',
                    description: 'Kilogramm- bzw. Liter-Bereich'
                },
                {
                    label: 'hoch',
                    code: 'HIGH',
                    description: 'Tonnen- bzw. Kubikmeter-Bereich'
                }
            ]
        },
        {
            label: 'Freisetzungsgruppe',
            options: [
                {
                    label: 'gering',
                    code: 'LOW',
                    description: 'Pellet, Wachs oder Granulat'
                },
                {
                    label: 'mittel',
                    code: 'MEDIUM',
                    description: 'Staub, der sich nach kurzer Zeit wieder setzt'
                },
                {
                    label: 'hoch',
                    code: 'HIGH',
                    description: 'Staubwolken, die einige Minuten in der Luft bleiben können'
                }
            ]
        }
    ];
}
