import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ISpotLightItem {
  Id: number;
  Title: string;
  ImageURL: { Url: string; Description: string };
  Created: string;
   Status?: boolean;
  Link: string;
  Description: string;
   Employee: { Title: string };
    JobRole:string
       
  }

export interface IStaffSpotlightProps {
  context: WebPartContext;
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listTitle: string;
}
