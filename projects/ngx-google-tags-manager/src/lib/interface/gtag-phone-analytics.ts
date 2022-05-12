export interface GtagPhoneAnalytics {
    phone_conversion_number: string;
    phone_conversion_country_code: string;
    phone_conversion_ids: string[];
    phone_conversion_class?: string;
    phone_conversion_callback?: () => void;
    phone_conversion_options?: string;
}
