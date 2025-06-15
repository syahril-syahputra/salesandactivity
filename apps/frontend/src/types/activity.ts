export interface Activity {
    id: string;
    userId: string;
    action: string;
    timestamp: string;
}

export interface IFilterActivity {
    userId: string;
}
