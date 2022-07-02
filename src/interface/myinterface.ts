import type { Dayjs } from "dayjs";

export interface FormState {
    Date: string;
    NodeID: string;
}

export interface FormStatePredict{
    'range': [string, string];
    Days: string;
    NodeID: string;
}

export type RangeValue = [Dayjs, Dayjs];