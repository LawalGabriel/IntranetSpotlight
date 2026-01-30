/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './StaffSpotlight.module.scss';
import type { ISpotLightItem, IStaffSpotlightProps } from './IStaffSpotlightProps';
import { SPFx, spfi } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { Placeholder } from '@pnp/spfx-controls-react';
import { Icon } from '@fluentui/react/lib/Icon';

const StaffSpotlight: React.FC<IStaffSpotlightProps> = (props) => {
  const [spotlightItems, setSpotlightItems] = useState<ISpotLightItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const spRef = useRef<any>(null);

  const loadSpotLightItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      if (!props.listTitle) {
        setSpotlightItems([]);
        setIsLoading(false);
        return;
      }

      const items: ISpotLightItem[] = await spRef.current.web.lists
        .getByTitle(props.listTitle)
        .items
        .select(
          "Id",
          "Title",        
          "Created",          
          "Status",
          "Description",
          "Employee/Title",
          "Employee/EMail",
          "Employee/JobTitle",
          "Employee/Department"
        )
        .expand("Employee")
        .filter("Status eq 1")
        .orderBy("Created", false)
        .top(props.defaultItemCount || 6)();

      setSpotlightItems(items);
      setIsLoading(false);

    } catch (error: any) {
      console.error('Error loading spotlight items:', error);
      setIsLoading(false);
      setErrorMessage(`Failed to load spotlight items. Please check if the list "${props.listTitle}" exists and you have permissions. Error: ${error.message}`);
    }
  }, [props.listTitle, props.defaultItemCount]);

  useEffect(() => {
    spRef.current = spfi().using(SPFx(props.context));
    void loadSpotLightItems();
  }, [props.listTitle, props.context, loadSpotLightItems]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
      }).toUpperCase();
    } catch (error) {
      return 'DATE NOT AVAILABLE';
    }
  };

  const goToPrevious = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === 0 ? spotlightItems.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentItemIndex(prevIndex => 
      prevIndex === spotlightItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getPreviousIndex = (currentIndex: number) => {
    return currentIndex === 0 ? spotlightItems.length - 1 : currentIndex - 1;
  };

  const getNextIndex = (currentIndex: number) => {
    return currentIndex === spotlightItems.length - 1 ? 0 : currentIndex + 1;
  };

  // Auto-rotate items every 10 seconds
  useEffect(() => {
    if (spotlightItems.length > 1) {
      const interval = setInterval(() => {
        goToNext();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [spotlightItems.length, currentItemIndex]);

  if (isLoading) {
    return (
      <div className={styles.staffSpotlight} style={{ 
        backgroundColor: props.backgroundColor || '#f5f5f5'
      }}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <div>Loading spotlight items...</div>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.staffSpotlight}>
        <div className={styles.errorContainer}>
          <Placeholder
            iconName='Error'
            iconText='Error'
            description={errorMessage}
          >
            <button
              className={styles.retryButton}
              onClick={() => loadSpotLightItems()}
            >
              Retry
            </button>
          </Placeholder>
        </div>
      </div>
    );
  }

  if (spotlightItems.length === 0) {
    return (
      <div className={styles.staffSpotlight}>
        <div className={styles.noItems}>
          <Icon iconName="Emoji2" className={styles.noItemsIcon} />
          <div>No spotlight items found.</div>
          <div className={styles.noItemsHelp}>
            Please configure a list in the web part properties.
          </div>
        </div>
      </div>
    );
  }

  const currentItem = spotlightItems[currentItemIndex];
  const previousItem = spotlightItems[getPreviousIndex(currentItemIndex)];
  const nextItem = spotlightItems[getNextIndex(currentItemIndex)];

  return (
    <div 
      className={styles.staffSpotlight}
      style={{ 
        backgroundColor: props.backgroundColor || '#ffffff'
      }}
    >
      {/* Header Section - Full Width */}
      <div 
        className={styles.headerSection} 
        style={{ 
          height: props.headerHeight || '80px'
        }}
      >
        <h1 
          className={styles.title} 
          style={{ 
            color: props.textColor || '#000000',
            fontSize: props.headerFontSize || '2.5rem'
          }}
        >
          {props.headerTitle || 'SPOTLIGHT'}
        </h1>
      </div>

      <div className={styles.separator} />

      {/* Full Width Container with Background Items */}
      <div className={styles.fullWidthContainer}>
        {/* Previous Item (Background Left) */}
        {spotlightItems.length > 1 && previousItem && (
          <div 
            className={styles.backgroundItemLeft}
            onClick={goToPrevious}
            style={{
              opacity: 0.7,
              transform: 'scale(0.85)',
              cursor: 'pointer'
            }}
          >
            <div className={styles.backgroundCard}>
              <div className={styles.backgroundContent}>
                <div className={styles.backgroundDate}>
                  {formatDate(previousItem.Created)}
                </div>
                <h4 className={styles.backgroundTitle}>{previousItem.Title}</h4>
              </div>
            </div>
          </div>
        )}

        {/* Current Item (Center) */}
        <div className={styles.centerItemContainer}>
          <div 
            className={styles.spotlightCard}
            style={{
              height: props.cardHeight || '550px',
              backgroundColor: props.cardBackgroundColor || '#ffffff',
              maxWidth: props.cardWidth || '800px'
            }}
          >
            <div className={styles.cardContent}>
              {/* Date Section */}
              <div 
                className={styles.cardDate}
                style={{ 
                  color: props.accentColor || '#0078d4'
                }}
              >
                {formatDate(currentItem.Created)}
              </div>
              
              {/* Spotlight Title Section */}
              <h3 
                className={styles.cardTitle}
                style={{ 
                  fontSize: props.spotlightTitleFontSize || '2rem',
                  color: props.spotlightTitleColor || '#000000',
                  fontWeight: props.spotlightTitleFontWeight || '700'
                }}
              >
                {currentItem.Title}
              </h3>
              
              {/* Description Section */}
              {currentItem.Description && (
                <div 
                  className={styles.cardDescriptionSection}
                  style={{
                    fontSize: props.descriptionFontSize || '1.1rem',
                    color: props.descriptionColor || '#333333',
                    backgroundColor: props.descriptionBackgroundColor || 'transparent',
                    padding: props.descriptionPadding || '0',
                    borderRadius: props.descriptionBorderRadius || '0',
                    lineHeight: props.descriptionLineHeight || '1.5'
                  }}
                >
                  <p>{currentItem.Description}</p>
                </div>
              )}
              
              {/* Employee Section - Positioned near bottom */}
              {currentItem.Employee && (
                <div className={styles.employeeSectionContainer}>
                  <div 
                    className={styles.cardEmployeeSection}
                    style={{
                      color: props.employeeTextColor || '#000000',
                      backgroundColor: props.employeeBackgroundColor || '#f8f9fa',
                      borderColor: props.employeeBorderColor || '#dee2e6',
                      borderWidth: props.employeeBorderWidth || '1px',
                      borderStyle: 'solid',
                      borderRadius: props.employeeBorderRadius || '8px',
                      padding: props.employeePadding || '1.25rem'
                    }}
                  >
                    <div className={styles.employeeProfile}>
                      <img 
                        src={currentItem.Employee.EMail ? 
                          `/_layouts/15/userphoto.aspx?size=M&accountname=${currentItem.Employee.EMail}` : 
                          'https://via.placeholder.com/70x70?text=User'
                        } 
                        alt={currentItem.Employee.Title}
                        className={styles.profilePicture}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/70x70?text=User';
                        }}
                      />
                      <div className={styles.employeeDetails}>
                        <div 
                          className={styles.employeeName}
                          style={{
                            fontSize: props.employeeNameFontSize || '1.25rem'
                          }}
                        >
                          {currentItem.Employee.Title}
                        </div>
                        {currentItem.Employee.JobTitle && (
                          <div 
                            className={styles.employeeJobTitle}
                            style={{
                              fontSize: props.employeeJobTitleFontSize || props.employeeFontSize || '1rem'
                            }}
                          >
                            {currentItem.Employee.JobTitle}
                          </div>
                        )}
                        {currentItem.Employee.Department && (
                          <div 
                            className={styles.employeeDepartment}
                            style={{
                              fontSize: props.employeeFontSize || '0.875rem'
                            }}
                          >
                            {currentItem.Employee.Department}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Next Item (Background Right) */}
        {spotlightItems.length > 1 && nextItem && (
          <div 
            className={styles.backgroundItemRight}
            onClick={goToNext}
            style={{
              opacity: 0.7,
              transform: 'scale(0.85)',
              cursor: 'pointer'
            }}
          >
            <div className={styles.backgroundCard}>
              <div className={styles.backgroundContent}>
                <div className={styles.backgroundDate}>
                  {formatDate(nextItem.Created)}
                </div>
                <h4 className={styles.backgroundTitle}>{nextItem.Title}</h4>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <button 
          className={styles.navButtonLeft} 
          onClick={goToPrevious}
          aria-label="Previous item"
        >
          <Icon iconName="ChevronLeft" />
        </button>
        
        <button 
          className={styles.navButtonRight} 
          onClick={goToNext}
          aria-label="Next item"
        >
          <Icon iconName="ChevronRight" />
        </button>
      </div>

      {/* Navigation Dots */}
      {spotlightItems.length > 1 && (
        <div className={styles.navDots}>
          {spotlightItems.map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${index === currentItemIndex ? styles.active : ''}`}
              onClick={() => setCurrentItemIndex(index)}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffSpotlight;