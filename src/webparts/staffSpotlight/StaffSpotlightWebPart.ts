import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
//import * as strings from 'StaffSpotlightWebPartStrings';
import StaffSpotlight from './components/StaffSpotlight';
import { IStaffSpotlightProps } from './components/IStaffSpotlightProps';

export interface IStaffSpotlightWebPartProps {
  // Basic properties
  listTitle: string;
  defaultItemCount: number;
  
  // Header properties
  headerTitle: string;
  headerFontSize: string;
  headerHeight: string;
  
  // Card properties
  cardHeight: string;
  cardWidth: string;
  cardBackgroundColor: string;
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
  employeeProfileSize: string;
  
  // Background items properties
  backgroundItemOpacity: number;
  backgroundItemScale: number;
  backgroundItemBlur: string;
  
  // Navigation properties
  navButtonSize: string;
  navButtonColor: string;
  navButtonBackground: string;
  navDotSize: string;
  navDotColor: string;
  navDotActiveColor: string;
  
  // Colors
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  
  // Layout properties
  showBackgroundItems: boolean;
  autoRotate: boolean;
  rotateInterval: number;
  fullWidth: boolean;
}

export default class StaffSpotlightWebPart extends BaseClientSideWebPart<IStaffSpotlightWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IStaffSpotlightProps> = React.createElement(
      StaffSpotlight,
      {
        description: this.description,
        context: this.context,
        listTitle: this.properties.listTitle,
        defaultItemCount: this.properties.defaultItemCount || 6,
        headerTitle: this.properties.headerTitle || 'SPOTLIGHT',
        headerFontSize: this.properties.headerFontSize || '2.5rem',
        headerHeight: this.properties.headerHeight || '80px',
        cardHeight: this.properties.cardHeight || '550px',
        cardWidth: this.properties.cardWidth || '800px',
        cardBackgroundColor: this.properties.cardBackgroundColor || '#ffffff',
        cardPadding: this.properties.cardPadding || '40px',
        cardBorderRadius: this.properties.cardBorderRadius || '12px',
        cardShadow: this.properties.cardShadow || '0 8px 30px rgba(0, 0, 0, 0.25)',
        spotlightTitleFontSize: this.properties.spotlightTitleFontSize || '2.5rem',
        spotlightTitleColor: this.properties.spotlightTitleColor || '#000000',
        spotlightTitleFontWeight: this.properties.spotlightTitleFontWeight || '700',
        spotlightTitlePadding: this.properties.spotlightTitlePadding || '0',
        spotlightTitleMargin: this.properties.spotlightTitleMargin || '0 0 30px 0',
        dateFontSize: this.properties.dateFontSize || '14px',
        dateColor: this.properties.dateColor || '#0078d4',
        dateFontWeight: this.properties.dateFontWeight || '600',
        descriptionFontSize: this.properties.descriptionFontSize || '1.2rem',
        descriptionColor: this.properties.descriptionColor || '#333333',
        descriptionBackgroundColor: this.properties.descriptionBackgroundColor || 'transparent',
        descriptionPadding: this.properties.descriptionPadding || '0',
        descriptionBorderRadius: this.properties.descriptionBorderRadius || '0',
        descriptionLineHeight: this.properties.descriptionLineHeight || '1.8',
        descriptionMargin: this.properties.descriptionMargin || '0',
        employeeTextColor: this.properties.employeeTextColor || '#000000',
        employeeBackgroundColor: this.properties.employeeBackgroundColor || '#f8f9fa',
        employeeBorderColor: this.properties.employeeBorderColor || '#dee2e6',
        employeeBorderWidth: this.properties.employeeBorderWidth || '1px',
        employeeBorderRadius: this.properties.employeeBorderRadius || '8px',
        employeePadding: this.properties.employeePadding || '20px',
        employeeFontSize: this.properties.employeeFontSize || '1rem',
        employeeNameFontSize: this.properties.employeeNameFontSize || '1.4rem',
        employeeJobTitleFontSize: this.properties.employeeJobTitleFontSize || '1.1rem',
        employeeMargin: this.properties.employeeMargin || '0',
        employeeProfileSize: this.properties.employeeProfileSize || '80px',
        backgroundItemOpacity: this.properties.backgroundItemOpacity || 0.7,
        backgroundItemScale: this.properties.backgroundItemScale || 0.85,
        backgroundItemBlur: this.properties.backgroundItemBlur || '0',
        navButtonSize: this.properties.navButtonSize || '50px',
        navButtonColor: this.properties.navButtonColor || '#0078d4',
        navButtonBackground: this.properties.navButtonBackground || 'rgba(255, 255, 255, 0.9)',
        navDotSize: this.properties.navDotSize || '12px',
        navDotColor: this.properties.navDotColor || '#e0e0e0',
        navDotActiveColor: this.properties.navDotActiveColor || '#0078d4',
        backgroundColor: this.properties.backgroundColor || '#ffffff',
        textColor: this.properties.textColor || '#000000',
        accentColor: this.properties.accentColor || '#0078d4',
        showBackgroundItems: this.properties.showBackgroundItems !== false,
        autoRotate: this.properties.autoRotate !== false,
        rotateInterval: this.properties.rotateInterval || 10000,
        fullWidth: this.properties.fullWidth !== false
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
                  description: 'Enter the name of your SharePoint list containing spotlight items',
                  value: ''
                }),
                PropertyPaneSlider('defaultItemCount', {
                  label: 'Number of Items',
                  min: 1,
                  max: 20,
                  value: 6,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneToggle('showBackgroundItems', {
                  label: 'Show Background Items',
                  onText: 'Show',
                  offText: 'Hide',
                  checked: true
                }),
                PropertyPaneToggle('autoRotate', {
                  label: 'Auto Rotate Items',
                  onText: 'On',
                  offText: 'Off',
                  checked: true
                }),
                PropertyPaneSlider('rotateInterval', {
                  label: 'Rotation Interval (ms)',
                  min: 3000,
                  max: 30000,
                  value: 10000,
                  showValue: true,
                  step: 1000
                }),
                PropertyPaneToggle('fullWidth', {
                  label: 'Full Width Layout',
                  onText: 'Full Width',
                  offText: 'Centered',
                  checked: true
                })
              ]
            },
            {
              groupName: "Header Settings",
              groupFields: [
                PropertyPaneTextField('headerTitle', {
                  label: 'Header Title',
                  value: 'SPOTLIGHT'
                }),
                PropertyPaneTextField('headerFontSize', {
                  label: 'Header Font Size',
                  value: '2.5rem'
                }),
                PropertyPaneTextField('headerHeight', {
                  label: 'Header Height',
                  value: '80px'
                })
              ]
            },
            {
              groupName: "Card Layout",
              groupFields: [
                PropertyPaneTextField('cardHeight', {
                  label: 'Card Height',
                  value: '550px'
                }),
                PropertyPaneTextField('cardWidth', {
                  label: 'Card Width',
                  value: '800px'
                }),
                PropertyPaneTextField('cardBackgroundColor', {
                  label: 'Card Background Color',
                  value: '#ffffff'
                }),
                PropertyPaneTextField('cardPadding', {
                  label: 'Card Padding',
                  value: '40px'
                }),
                PropertyPaneTextField('cardBorderRadius', {
                  label: 'Card Border Radius',
                  value: '12px'
                }),
                PropertyPaneTextField('cardShadow', {
                  label: 'Card Shadow',
                  value: '0 8px 30px rgba(0, 0, 0, 0.25)'
                })
              ]
            },
            {
              groupName: "Spotlight Title",
              groupFields: [
                PropertyPaneTextField('spotlightTitleFontSize', {
                  label: 'Title Font Size',
                  value: '2.5rem'
                }),
                PropertyPaneTextField('spotlightTitleColor', {
                  label: 'Title Color',
                  value: '#000000'
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
                  selectedKey: '700'
                }),
                PropertyPaneTextField('spotlightTitlePadding', {
                  label: 'Title Padding',
                  value: '0'
                }),
                PropertyPaneTextField('spotlightTitleMargin', {
                  label: 'Title Margin',
                  value: '0 0 30px 0'
                })
              ]
            },
            {
              groupName: "Date Display",
              groupFields: [
                PropertyPaneTextField('dateFontSize', {
                  label: 'Date Font Size',
                  value: '14px'
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
                  value: '1.2rem'
                }),
                PropertyPaneTextField('descriptionColor', {
                  label: 'Text Color',
                  value: '#333333'
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
                  value: '1.8'
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
                  value: '#000000'
                }),
                PropertyPaneTextField('employeeBackgroundColor', {
                  label: 'Background Color',
                  value: '#f8f9fa'
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
                  value: '20px'
                }),
                PropertyPaneTextField('employeeFontSize', {
                  label: 'General Font Size',
                  value: '1rem'
                }),
                PropertyPaneTextField('employeeNameFontSize', {
                  label: 'Name Font Size',
                  value: '1.4rem'
                }),
                PropertyPaneTextField('employeeJobTitleFontSize', {
                  label: 'Job Title Font Size',
                  value: '1.1rem'
                }),
                PropertyPaneTextField('employeeMargin', {
                  label: 'Margin',
                  value: '0'
                }),
                PropertyPaneTextField('employeeProfileSize', {
                  label: 'Profile Picture Size',
                  value: '80px'
                })
              ]
            },
            {
              groupName: "Background Items",
              groupFields: [
                PropertyPaneSlider('backgroundItemOpacity', {
                  label: 'Background Opacity',
                  min: 0.1,
                  max: 1,
                  value: 0.7,
                  step: 0.1,
                  showValue: true
                }),
                PropertyPaneSlider('backgroundItemScale', {
                  label: 'Background Scale',
                  min: 0.5,
                  max: 1,
                  value: 0.85,
                  step: 0.05,
                  showValue: true
                }),
                PropertyPaneTextField('backgroundItemBlur', {
                  label: 'Background Blur',
                  value: '0',
                  description: 'e.g., 2px, 5px'
                })
              ]
            },
            {
              groupName: "Navigation Controls",
              groupFields: [
                PropertyPaneTextField('navButtonSize', {
                  label: 'Button Size',
                  value: '50px'
                }),
                PropertyPaneTextField('navButtonColor', {
                  label: 'Button Color',
                  value: '#0078d4'
                }),
                PropertyPaneTextField('navButtonBackground', {
                  label: 'Button Background',
                  value: 'rgba(255, 255, 255, 0.9)'
                }),
                PropertyPaneTextField('navDotSize', {
                  label: 'Dot Size',
                  value: '12px'
                }),
                PropertyPaneTextField('navDotColor', {
                  label: 'Dot Color',
                  value: '#e0e0e0'
                }),
                PropertyPaneTextField('navDotActiveColor', {
                  label: 'Active Dot Color',
                  value: '#0078d4'
                })
              ]
            },
            {
              groupName: "Colors",
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: 'Background Color',
                  value: '#ffffff'
                }),
                PropertyPaneTextField('textColor', {
                  label: 'Text Color',
                  value: '#000000'
                }),
                PropertyPaneTextField('accentColor', {
                  label: 'Accent Color',
                  value: '#0078d4'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}