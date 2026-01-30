// StaffSpotlightWebPart.ts (or wherever your web part class is)
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneDropdown
 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import { IReadonlyTheme } from '@microsoft/sp-component-base';
//import * as strings from 'StaffSpotlightWebPartStrings';
import StaffSpotlight from './components/StaffSpotlight';
import { IStaffSpotlightProps } from './components/IStaffSpotlightProps';

export interface IStaffSpotlightWebPartProps {
  // Basic properties
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

export default class StaffSpotlightWebPart extends BaseClientSideWebPart<IStaffSpotlightWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IStaffSpotlightProps> = React.createElement(
      StaffSpotlight,
      {
        // Pass all properties
        ...this.properties,
        description: this.properties.headerTitle || 'STAFF SPOTLIGHT',
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Staff Spotlight Configuration'
          },
          groups: [
            {
              groupName: "Basic Settings",
              groupFields: [
                PropertyPaneTextField('listTitle', {
                  label: 'List Title',
                  value: 'StaffSpotlight'
                }),
                PropertyPaneSlider('defaultItemCount', {
                  label: 'Number of Items to Show',
                  min: 1,
                  max: 20,
                  value: 6,
                  showValue: true,
                  step: 1
                })
              ]
            },
            {
              groupName: "Header Settings",
              groupFields: [
                PropertyPaneTextField('headerTitle', {
                  label: 'Header Title',
                  value: 'STAFF SPOTLIGHT'
                }),
                PropertyPaneTextField('headerFontSize', {
                  label: 'Header Font Size',
                  value: '2rem'
                }),
                PropertyPaneTextField('headerHeight', {
                  label: 'Header Height',
                  value: '60px'
                })
              ]
            },
            {
              groupName: "Card Layout",
              groupFields: [
                PropertyPaneTextField('cardHeight', {
                  label: 'Card Height',
                  value: '600px'
                }),
                PropertyPaneTextField('cardWidth', {
                  label: 'Card Width',
                  value: '650px'
                }),
                PropertyPaneTextField('cardPadding', {
                  label: 'Card Padding',
                  value: '2.5rem'
                }),
                PropertyPaneTextField('cardBorderRadius', {
                  label: 'Card Border Radius',
                  value: '12px'
                }),
                PropertyPaneTextField('cardShadow', {
                  label: 'Card Shadow',
                  value: '0 4px 12px rgba(0, 0, 0, 0.15)'
                })
              ]
            },
            {
              groupName: "Spotlight Title",
              groupFields: [
                PropertyPaneTextField('spotlightTitleFontSize', {
                  label: 'Title Font Size',
                  value: '1.5rem'
                }),
                PropertyPaneTextField('spotlightTitleColor', {
                  label: 'Title Color',
                  value: '#323130'
                }),
                PropertyPaneDropdown('spotlightTitleFontWeight', {
                  label: 'Title Font Weight',
                  options: [
                    { key: '300', text: 'Light' },
                    { key: '400', text: 'Normal' },
                    { key: '600', text: 'Semi-Bold' },
                    { key: '700', text: 'Bold' },
                    { key: '900', text: 'Black' }
                  ],
                  selectedKey: '600'
                }),
                PropertyPaneTextField('spotlightTitlePadding', {
                  label: 'Title Padding',
                  value: '0'
                }),
                PropertyPaneTextField('spotlightTitleMargin', {
                  label: 'Title Margin',
                  value: '0'
                })
              ]
            },
            {
              groupName: "Date Display",
              groupFields: [
                PropertyPaneTextField('dateFontSize', {
                  label: 'Date Font Size',
                  value: '0.875rem'
                }),
                PropertyPaneTextField('dateColor', {
                  label: 'Date Color',
                  value: '#0078d4'
                }),
                PropertyPaneDropdown('dateFontWeight', {
                  label: 'Date Font Weight',
                  options: [
                    { key: '400', text: 'Normal' },
                    { key: '600', text: 'Semi-Bold' },
                    { key: '700', text: 'Bold' }
                  ],
                  selectedKey: '600'
                })
              ]
            },
            {
              groupName: "Description Section",
              groupFields: [
                PropertyPaneTextField('descriptionFontSize', {
                  label: 'Font Size',
                  value: '1rem'
                }),
                PropertyPaneTextField('descriptionColor', {
                  label: 'Text Color',
                  value: '#555555'
                }),
                PropertyPaneTextField('descriptionBackgroundColor', {
                  label: 'Background Color',
                  value: 'transparent'
                }),
                PropertyPaneTextField('descriptionPadding', {
                  label: 'Padding',
                  value: '0'
                }),
                PropertyPaneTextField('descriptionBorderRadius', {
                  label: 'Border Radius',
                  value: '0'
                }),
                PropertyPaneTextField('descriptionLineHeight', {
                  label: 'Line Height',
                  value: '1.5'
                }),
                PropertyPaneTextField('descriptionMargin', {
                  label: 'Margin',
                  value: '0'
                })
              ]
            },
            {
              groupName: "Employee Section",
              groupFields: [
                PropertyPaneTextField('employeeTextColor', {
                  label: 'Text Color',
                  value: 'inherit'
                }),
                PropertyPaneTextField('employeeBackgroundColor', {
                  label: 'Background Color',
                  value: 'rgba(248, 249, 250, 0.9)'
                }),
                PropertyPaneTextField('employeeBorderColor', {
                  label: 'Border Color',
                  value: '#dee2e6'
                }),
                PropertyPaneTextField('employeeBorderWidth', {
                  label: 'Border Width',
                  value: '1px'
                }),
                PropertyPaneTextField('employeeBorderRadius', {
                  label: 'Border Radius',
                  value: '8px'
                }),
                PropertyPaneTextField('employeePadding', {
                  label: 'Padding',
                  value: '1.25rem'
                }),
                PropertyPaneTextField('employeeFontSize', {
                  label: 'General Font Size',
                  value: '1rem'
                }),
                PropertyPaneTextField('employeeNameFontSize', {
                  label: 'Name Font Size',
                  value: '1.25rem'
                }),
                PropertyPaneTextField('employeeJobTitleFontSize', {
                  label: 'Job Title Font Size',
                  value: '1rem'
                }),
                PropertyPaneTextField('employeeMargin', {
                  label: 'Margin',
                  value: '0'
                })
              ]
            },
            {
              groupName: "Colors",
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: 'Background Color',
                  value: 'transparent'
                }),
                PropertyPaneTextField('textColor', {
                  label: 'Text Color',
                  value: 'inherit'
                }),
                PropertyPaneTextField('cardBackgroundColor', {
                  label: 'Card Background Color',
                  value: '#ffffff'
                }),
                PropertyPaneTextField('accentColor', {
                  label: 'Accent Color',
                  value: '#0078d4'
                })
              ]
            },
            {
              groupName: "Navigation Controls",
              groupFields: [
                PropertyPaneTextField('navButtonSize', {
                  label: 'Button Size',
                  value: '40px'
                }),
                PropertyPaneTextField('navButtonColor', {
                  label: 'Button Color',
                  value: 'inherit'
                }),
                PropertyPaneTextField('navDotSize', {
                  label: 'Dot Size',
                  value: '10px'
                }),
                PropertyPaneTextField('navDotColor', {
                  label: 'Dot Color',
                  value: 'rgba(0, 0, 0, 0.2)'
                }),
                PropertyPaneTextField('navDotActiveColor', {
                  label: 'Active Dot Color',
                  value: 'currentColor'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}