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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(props.defaultView || 'grid');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
          "JobRole"
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

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

  return (
    <div 
      className={styles.staffSpotlight}
      style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
      }}
    >
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.title} style={{ color: props.textColor || '#323130' }}>
          STAFF SPOTLIGHT
        </h1>
        
        {/* View Toggle Buttons */}
        <div className={styles.viewToggle}>
          <button 
            className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            style={{ 
              backgroundColor: viewMode === 'grid' ? props.accentColor || '#0078d4' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : props.textColor || '#323130'
            }}
          >
            <Icon iconName="GridViewMedium" /> Grid
          </button>
          <button 
            className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            style={{ 
              backgroundColor: viewMode === 'list' ? props.accentColor || '#0078d4' : 'transparent',
              color: viewMode === 'list' ? '#ffffff' : props.textColor || '#323130'
            }}
          >
            <Icon iconName="List" /> List
          </button>
        </div>
      </div>

      <div className={styles.separator}></div>

      {/* Content Section */}
      {spotlightItems.length === 0 ? (
        <div className={styles.noItems}>
          <Icon iconName="Emoji2" className={styles.noItemsIcon} />
          <div>No spotlight items found.</div>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            /* Grid View with Horizontal Scroll */
            <div className={styles.gridContainer}>
              <button 
                className={styles.scrollButton} 
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <Icon iconName="ChevronLeft" />
              </button>
              
              <div 
                className={styles.horizontalScrollContainer} 
                ref={scrollContainerRef}
              >
                {spotlightItems.map((item: ISpotLightItem) => (
                  <a 
                    key={item.Id} 
                    href={item.Link || "#"}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.spotlightCard}
                    style={{ 
                      backgroundColor: props.cardBackgroundColor || '#ffffff',
                      color: props.textColor || '#323130'
                    }}
                  >
                    <div className={styles.cardContent}>
                      <div className={styles.cardDate}>
                        {formatDate(item.Created)}
                      </div>
                      <h3 className={styles.cardTitle}>{item.Title}</h3>
                      <p className={styles.cardDescription}>{item.Description}</p>
                      {item.Employee && (
                        <div className={styles.cardEmployee}>
                          <span className={styles.employeeName}>{item.Employee.Title}</span>
                          {item.JobRole && (
                            <span className={styles.employeeRole}> • {item.JobRole}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
              
              <button 
                className={styles.scrollButton} 
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <Icon iconName="ChevronRight" />
              </button>
            </div>
          ) : (
            /* List View */
            <div className={styles.listContainer}>
              {spotlightItems.map((item: ISpotLightItem) => (
                <a 
                  key={item.Id} 
                  href={item.Link || "#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.spotlightListItem}
                  style={{ 
                    backgroundColor: props.cardBackgroundColor || '#ffffff',
                    color: props.textColor || '#323130'
                  }}
                >
                  <div className={styles.listItemContent}>
                    <div className={styles.listItemHeader}>
                      <div className={styles.listItemDate}>
                        {formatDate(item.Created)}
                      </div>
                      <h3 className={styles.listItemTitle}>{item.Title}</h3>
                    </div>
                    <p className={styles.listItemDescription}>{item.Description}</p>
                    {item.Employee && (
                      <div className={styles.listItemEmployee}>
                        <span className={styles.employeeName}>{item.Employee.Title}</span>
                        {item.JobRole && (
                          <span className={styles.employeeRole}> • {item.JobRole}</span>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StaffSpotlight;