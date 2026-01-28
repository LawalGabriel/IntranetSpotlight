/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStaffSpotlightProps {
  description: string;
  context: any;
  listTitle: string;
  
  // Configurable properties
  backgroundColor: string;
  textColor: string;
  bodyTextColor: string; // New: Body text color
  cardBackgroundColor: string;
  accentColor: string;
  defaultItemCount: number;
  defaultView: 'grid' | 'list';
  defaultImage: string;
}

export interface ISpotLightItem {
  Id: number;
  Title: string;
  Created: string;
  Status: number;
  Description: string;
  Link: string;
  ImageURL: string;
  Employee: {
    Id: number;
    Title: string;
    EMail: string; // Added for profile picture
    JobTitle: string;
    Department: string;
  };
}

export interface IStaffSpotlightWebPartProps {
  description: string;
  listTitle: string;
  backgroundColor: string;
  textColor: string;
  bodyTextColor: string; // New: Body text color
  cardBackgroundColor: string;
  accentColor: string;
  defaultItemCount: number;
  defaultView: 'grid' | 'list';
  defaultImage: string;
}