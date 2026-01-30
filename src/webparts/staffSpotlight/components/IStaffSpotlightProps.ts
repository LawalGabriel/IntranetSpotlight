export interface IStaffSpotlightProps {
  description: string;
  context: any;
  listTitle: string;
  
  // Basic Properties
  defaultItemCount?: number;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
  
  // Header Properties
  headerTitle?: string;
  headerFontSize?: string;
  headerHeight?: string;
  
  // Card Dimensions & Styling
  cardHeight?: string;
  cardWidth?: string;
  cardBackgroundColor?: string;
  cardPadding?: string;
  cardBorderRadius?: string;
  cardShadow?: string;
  
  // Date Properties
  dateFontSize?: string;
  dateColor?: string;
  dateFontWeight?: string;
  
  // Spotlight Title Properties
  spotlightTitleFontSize?: string;
  spotlightTitleColor?: string;
  spotlightTitleFontWeight?: string;
  spotlightTitlePadding?: string;
  spotlightTitleMargin?: string;
  
  // Description Properties
  descriptionFontSize?: string;
  descriptionColor?: string;
  descriptionBackgroundColor?: string;
  descriptionPadding?: string;
  descriptionBorderRadius?: string;
  descriptionLineHeight?: string;
  descriptionMargin?: string;
  
  // Employee Properties
  employeeTextColor?: string;
  employeeBackgroundColor?: string;
  employeeBorderColor?: string;
  employeeBorderWidth?: string;
  employeeBorderRadius?: string;
  employeePadding?: string;
  employeeFontSize?: string;
  employeeNameFontSize?: string;
  employeeJobTitleFontSize?: string;
  employeeMargin?: string;
  employeeProfileSize?: string;
  
  // Background Items Properties
  backgroundItemOpacity?: number;
  backgroundItemScale?: number;
  backgroundItemBlur?: string;
  showBackgroundItems?: boolean;
  
  // Navigation Button Properties
  navButtonSize?: string;
  navButtonColor?: string;
  navButtonBackground?: string;
  
  // Navigation Dot Properties
  navDotSize?: string;
  navDotColor?: string;
  navDotActiveColor?: string;
  
  // Auto-rotate Properties
  autoRotate?: boolean;
  rotateInterval?: number;
  
  // Layout Properties
  fullWidth?: boolean;
}

export interface ISpotLightItem {
  Id: number;
  Title: string;
  Created: string;
  Status: number;
  Description?: string;
  Link?: string;
  ImageURL?: string;
  Employee?: {
    Title: string;
    Id: number;
    EMail: string;
    JobTitle?: string;
    Department?: string;
  };
  AttachmentFiles?: {
    FileName: string;
    ServerRelativeUrl: string;
  }[];
}

export interface IStaffSpotlightWebPartProps {
  description: string;
  listTitle: string;
  
  // Basic Properties
  defaultItemCount: number;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  
  // Header Properties
  headerTitle: string;
  headerFontSize: string;
  headerHeight: string;
  
  // Card Dimensions & Styling
  cardHeight: string;
  cardWidth: string;
  cardBackgroundColor: string;
  cardPadding: string;
  cardBorderRadius: string;
  cardShadow: string;
  
  // Date Properties
  dateFontSize: string;
  dateColor: string;
  dateFontWeight: string;
  
  // Spotlight Title Properties
  spotlightTitleFontSize: string;
  spotlightTitleColor: string;
  spotlightTitleFontWeight: string;
  spotlightTitlePadding: string;
  spotlightTitleMargin: string;
  
  // Description Properties
  descriptionFontSize: string;
  descriptionColor: string;
  descriptionBackgroundColor: string;
  descriptionPadding: string;
  descriptionBorderRadius: string;
  descriptionLineHeight: string;
  descriptionMargin: string;
  
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
  employeeMargin: string;
  employeeProfileSize: string;
  
  // Background Items Properties
  backgroundItemOpacity: number;
  backgroundItemScale: number;
  backgroundItemBlur: string;
  showBackgroundItems: boolean;
  
  // Navigation Button Properties
  navButtonSize: string;
  navButtonColor: string;
  navButtonBackground: string;
  
  // Navigation Dot Properties
  navDotSize: string;
  navDotColor: string;
  navDotActiveColor: string;
  
  // Auto-rotate Properties
  autoRotate: boolean;
  rotateInterval: number;
  
  // Layout Properties
  fullWidth: boolean;
}