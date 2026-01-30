declare interface IStaffSpotlightWebPartStrings {
  DefaultItemCountFieldLabel: string | undefined;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListTitleFieldLabel: string;
}

declare module 'StaffSpotlightWebPartStrings' {
  const strings: IStaffSpotlightWebPartStrings;
  export = strings;
}