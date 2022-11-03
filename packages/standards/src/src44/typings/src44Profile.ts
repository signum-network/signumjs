import { SRC44ProfileType } from './src44ProfileType';

interface MediaType {
    [key: string]: string;
}

export interface Src44Profile {
    vs: number;
    nm: string;
    ds?: string;
    tp?: SRC44ProfileType;
    av?: MediaType;
    bg?: MediaType;
    hp?: string;
    sr?: string;
    al?: string;
    xt?: string;
    sc?: string[];

    [other: string]: unknown;
}
