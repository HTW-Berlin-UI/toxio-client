export interface Settings {
    debugMode?: boolean;
    current?: {
        user: {
            can: {
                addUsage: boolean;
            };
        };
        organization: {
            id: number;
        };
        unit: {
            id: number;
        };
    };
}
