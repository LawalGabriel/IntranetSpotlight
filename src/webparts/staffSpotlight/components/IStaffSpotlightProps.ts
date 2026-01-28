/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStaffSpotlightProps {
  description: string;
  context: any;
  listTitle: string;
  
  // Configurable properties
  backgroundColor: string;
  textColor: string;
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
    JobRole: string;
    Department: string;
  };
  JobRole: string;
  Department: string;
}