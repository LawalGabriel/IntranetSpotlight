/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  
  IPropertyPaneField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'StaffSpotlightWebPartStrings';
import StaffSpotlight from './components/StaffSpotlight';
import { IStaffSpotlightProps } from './components/IStaffSpotlightProps';

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
}

export default class StaffSpotlightWebPart extends BaseClientSideWebPart<IStaffSpotlightWebPartProps> {


  protected onInit(): Promise<void> {

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IStaffSpotlightProps> = React.createElement(
      StaffSpotlight,
      {
        description: this.properties.description,
        context: this.context,
        listTitle: this.properties.listTitle || 'StaffSpotlight',
        backgroundColor: this.properties.backgroundColor,
        textColor: this.properties.textColor,
        cardBackgroundColor: this.properties.cardBackgroundColor,
        accentColor: this.properties.accentColor,
        defaultItemCount: this.properties.defaultItemCount,
        defaultView: this.properties.defaultView,
        defaultImage: this.properties.defaultImage,
        bodyTextColor: this.properties.bodyTextColor

      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
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
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              }),
              PropertyPaneTextField('listTitle', {
                label: strings.ListTitleFieldLabel,
                placeholder: 'Enter list title'
              }),
              PropertyPaneSlider('defaultItemCount', {
                label: 'Default Item Count',
                min: 3,
                max: 20,
                value: 6,
                showValue: true
              }),
              PropertyPaneTextField('defaultImage', {
                label: 'Default Image URL',
                placeholder: 'URL for default background image'
              })
            ] as IPropertyPaneField<any>[]
          },
          {
            groupName: 'Styling',
            groupFields: [
              PropertyPaneTextField('backgroundColor', {
                label: 'Background Color',
                value: 'transparent'
              }),
              PropertyPaneTextField('textColor', {
                label: 'Text Color',
                value: '#323130'
              }),
              PropertyPaneTextField('bodyTextColor', {
                label: 'Body Text Color',
                value: '#605e5c',
                description: 'Color for description text and secondary content'
              }),
              PropertyPaneTextField('cardBackgroundColor', {
                label: 'Card Background Color',
                value: '#ffffff'
              }),
              PropertyPaneTextField('accentColor', {
                label: 'Accent Color',
                value: '#0078d4',
                description: 'Color for dates and accents'
              })
            ] as IPropertyPaneField<any>[]
          }
        ]
      }
    ]
  };
}
}