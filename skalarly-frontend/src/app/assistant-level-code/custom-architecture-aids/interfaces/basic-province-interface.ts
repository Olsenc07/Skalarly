export interface BasicProvinceInterface {
  regions: {
    province: string;
    schoolTypes: {
      universities: basicinfo[];
      colleges: basicinfo[];
      technicalInstitutes: basicinfo[];
      theologicalSchools: basicinfo[];
    };
  }[];
}
export interface ProvinceSchoolTypes {
  province: string;
  schoolTypes: {
    universities: basicinfo[];
    colleges: basicinfo[];
    technicalInstitutes: basicinfo[];
    theologicalSchools: basicinfo[];
  };
}

export interface basicinfo {
  name: string;
  emailExtensions: string[]
}
