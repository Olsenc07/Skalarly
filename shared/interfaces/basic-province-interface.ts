export interface BasicInfo {
  name: string;
  emailExtensions: string[];
}
export interface ProvinceSchoolTypes {
  province: string;
  schoolTypes: {
    universities: BasicInfo[];
    colleges: BasicInfo[];
    technicalInstitutes: BasicInfo[];
    theologicalSchools: BasicInfo[];
  };
}
export interface BasicProvinceInterface {
  regions: ProvinceSchoolTypes[];
}

