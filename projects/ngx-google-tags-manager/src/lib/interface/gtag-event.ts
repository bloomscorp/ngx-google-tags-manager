export interface GtagEvent {
    action: string;
    event_category?: string;
    event_label?: string;
    value?: any;
    [key: string]: any;
}
