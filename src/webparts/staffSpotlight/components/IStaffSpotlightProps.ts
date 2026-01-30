/* eslint-disable @typescript-eslint/no-explicit-any */
// IStaffSpotlightProps.ts
export interface IStaffSpotlightProps {
  // Basic properties
  description: string;
  context: any;
  listTitle: string;
  defaultItemCount: number;
  
  // Layout properties
  backgroundColor: string;
  textColor: string;
  cardBackgroundColor: string;
  accentColor: string;
  
  // Header properties
  headerTitle: string;
  headerFontSize: string;
  headerHeight: string;
  
  // Card properties
  cardHeight: string;
  cardWidth: string;
  cardPadding: string;
  cardBorderRadius: string;
  cardShadow: string;
  
  // Spotlight title properties
  spotlightTitleFontSize: string;
  spotlightTitleColor: string;
  spotlightTitleFontWeight: string;
  spotlightTitlePadding: string;
  spotlightTitleMargin: string;
  
  // Date properties
  dateFontSize: string;
  dateColor: string;
  dateFontWeight: string;
  
  // Description section properties
  descriptionFontSize: string;
  descriptionColor: string;
  descriptionBackgroundColor: string;
  descriptionPadding: string;
  descriptionBorderRadius: string;
  descriptionLineHeight: string;
  descriptionMargin: string;
  
  // Employee section properties
  employeeTextColor: string;
  employeeBackgroundColor: string;
  employeeBorderColor: string;
  employeeBorderWidth: string;
  employeeBorderRadius: string;
  employeePadding: string;
  employeeFontSize: string;
  employeeNameFontSize: string;
  employeeJobTitleFontSize: string;
  employeeMargin: string;
  
  // Navigation properties
  navButtonSize: string;
  navButtonColor: string;
  navDotSize: string;
  navDotColor: string;
  navDotActiveColor: string;

  
}
export interface IStaffSpotlightWebPartProps {
  bodyTextColor: string;
  description: string;
  listTitle: string;
  backgroundColor: string;
  textColor: string;
  cardBackgroundColor: string;
  accentColor: string;
  defaultItemCount: number;
  defaultView: 'grid' | 'list';
  defaultImage: string;
  headerTitle: string;
  headerFontSize: string;
  headerHeight: string;
  
  // Spotlight Title Properties
  spotlightTitleFontSize: string;
  spotlightTitleColor: string;
  spotlightTitleFontWeight: string;
  
  // Description Properties
  descriptionFontSize: string;
  descriptionColor: string;
  descriptionBackgroundColor: string;
  descriptionPadding: string;
  descriptionBorderRadius: string;
  descriptionLineHeight: string;
  
  // Employee Properties
  employeeTextColor: string;
  employeeBackgroundColor: string;
  employeeBorderColor: string;
  employeeBorderWidth: string;
  employeeBorderRadius: string;
  employeePadding: string;
  employeeFontSize: string;
  employeeNameFontSize: string;
  employeeJobTitleFontSize: string;
}

export interface ISpotLightItem {
  Id: number;
  Title: string;
  Created: string;
  Status: number;
  Description: string;
  Link: string;
  ImageURL: string;
  AttachmentFiles: { FileName: string; ServerRelativeUrl: string }[];
  Employee: {
    Id: number;
    Title: string;
    EMail: string; // Added for profile picture
    JobTitle: string;
    Department: string;
      };
}

