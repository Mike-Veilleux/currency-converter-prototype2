export interface ICurrencyData {
  code: string;
  fullName: string;
  rate: number;
  value: number;
}

export interface IPaginatedData {
  [key: string]: ICurrencyData[];
}

export interface IRates {
  [key: string]: any;
}

export type CalculatedRates = ICurrencyData[];

export type Definition = [string, string];
