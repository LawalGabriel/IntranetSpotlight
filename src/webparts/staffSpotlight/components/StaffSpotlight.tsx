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
          "Link",
          "ImageURL",
          "Employee/Title",
          "Employee/Id",
          "Employee/EMail",
          "Employee/JobTitle",
          "Employee/Department",
          "AttachmentFiles/FileName",
        )
        .expand("Employee,AttachmentFiles")
        .filter("Status eq 1")
        .orderBy("Created", false)
        .top(props.defaultItemCount || 6)();

      setSpotlightItems(items);
      setIsLoading(false);
      setCurrentItemIndex(0);

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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
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

  // Auto-rotate items every 10 seconds
  useEffect(() => {
    if (spotlightItems.length > 1) {
      const interval = setInterval(() => {
        goToNext();
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [spotlightItems.length]);

  if (isLoading) {
    return (
      <div className={styles.staffSpotlight} style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
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
      <div className={styles.staffSpotlight} style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
      }}>
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
      <div className={styles.staffSpotlight} style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
      }}>
        <div className={styles.noItems}>
          <Icon iconName="Emoji2" className={styles.noItemsIcon} />
          <div>No spotlight items found.</div>
        </div>
      </div>
    );
  }

  const currentItem = spotlightItems[currentItemIndex];

  return (
    <div 
      className={styles.staffSpotlight}
      style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
      }}
    >
      {/* Header Section */}
      <div 
        className={styles.headerSection} 
        style={{ 
          height: props.headerHeight || 'auto',
          minHeight: props.headerHeight || '60px'
        }}
      >
        <h1 
          className={styles.title} 
          style={{ 
            color: props.textColor || '#323130',
            fontSize: props.headerFontSize || '2rem'
          }}
        >
          {props.headerTitle || 'STAFF SPOTLIGHT'}
        </h1>
      </div>

      <div className={styles.separator} />

      {/* Single Item Display */}
      <div className={styles.singleItemContainer}>
        <button 
          className={styles.navButton} 
          onClick={goToPrevious}
          aria-label="Previous item"
          disabled={spotlightItems.length <= 1}
          style={{
            width: props.navButtonSize || '40px',
            height: props.navButtonSize || '40px',
            color: props.navButtonColor || 'inherit'
          }}
        >
          <Icon iconName="ChevronLeft" />
        </button>
        
        <div 
          className={styles.spotlightCard}
          style={{
            height: props.cardHeight || '600px',
            width: props.cardWidth || '650px',
            borderRadius: props.cardBorderRadius || '12px',
            boxShadow: props.cardShadow || '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
        >
          <div 
            className={styles.cardContent}
            style={{ 
              backgroundColor: props.cardBackgroundColor || '#ffffff',
              padding: props.cardPadding || '2.5rem'
            }}
          >
            {/* Date Section */}
            <div 
              className={styles.cardDate}
              style={{ 
                color: props.dateColor || props.accentColor || '#0078d4',
                fontSize: props.dateFontSize || '0.875rem',
                fontWeight: props.dateFontWeight || '600'
              }}
            >
              {formatDate(currentItem.Created)}
            </div>
            
            {/* Spotlight Title Section */}
            <h3 
              className={styles.cardTitle}
              style={{ 
                fontSize: props.spotlightTitleFontSize || '1.5rem',
                color: props.spotlightTitleColor || '#323130',
                fontWeight: props.spotlightTitleFontWeight || '600',
                padding: props.spotlightTitlePadding || '0',
                margin: props.spotlightTitleMargin || '0'
              }}
            >
              {currentItem.Title}
            </h3>
            
            {/* Description Section */}
            {currentItem.Description && (
              <div 
                className={styles.cardDescriptionSection}
                style={{
                  fontSize: props.descriptionFontSize || '1rem',
                  color: props.descriptionColor || '#555555',
                  backgroundColor: props.descriptionBackgroundColor || 'transparent',
                  padding: props.descriptionPadding || '0',
                  borderRadius: props.descriptionBorderRadius || '0',
                  lineHeight: props.descriptionLineHeight || '1.5',
                  margin: props.descriptionMargin || '0'
                }}
              >
                <p>{currentItem.Description}</p>
              </div>
            )}
            
            {/* Employee Section */}
            {currentItem.Employee && (
              <div 
                className={styles.cardEmployeeSection}
                style={{
                  color: props.employeeTextColor || 'inherit',
                  backgroundColor: props.employeeBackgroundColor || 'rgba(248, 249, 250, 0.9)',
                  borderColor: props.employeeBorderColor || '#dee2e6',
                  borderWidth: props.employeeBorderWidth || '1px',
                  borderStyle: 'solid',
                  borderRadius: props.employeeBorderRadius || '8px',
                  padding: props.employeePadding || '1.25rem',
                  margin: props.employeeMargin || '0'
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
                          color: props.employeeTextColor || '#666666',
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
                          color: props.employeeTextColor || '#888888',
                          fontSize: props.employeeFontSize || '0.875rem'
                        }}
                      >
                        {currentItem.Employee.Department}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          className={styles.navButton} 
          onClick={goToNext}
          aria-label="Next item"
          disabled={spotlightItems.length <= 1}
          style={{
            width: props.navButtonSize || '40px',
            height: props.navButtonSize || '40px',
            color: props.navButtonColor || 'inherit'
          }}
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
              style={{
                width: props.navDotSize || '10px',
                height: props.navDotSize || '10px',
                backgroundColor: props.navDotColor || 'rgba(0, 0, 0, 0.2)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffSpotlight;