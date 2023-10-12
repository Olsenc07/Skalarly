export interface InstitutionDataInterface {
  // don't think will use two code
  alpha_two_code?: string;
  country: string;
  'state-province': string;
  domains: string | string[];
  name: string;
  web_pages: string | string[];
}
