import { WebPartContext } from "@microsoft/sp-webpart-base";

  export interface IStaffSpotlightProps {
  description: string;
  context: WebPartContext;
  listTitle: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;

  // Configurable properties
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
    JobRole: JSX.Element;
    Id: number;
    Title: string;
   Department: string;
  };
  JobRole: string;
  Department: string;
}