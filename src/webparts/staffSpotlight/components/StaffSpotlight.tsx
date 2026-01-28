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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDefaultImage = (): string => {
    return props.defaultImage || 'https://via.placeholder.com/400x300?text=Staff+Spotlight';
  };

  const getProfilePictureUrl = (email: string): string => {
    if (!email) return '';
    return `/_layouts/15/userphoto.aspx?size=M&accountname=${email}`;
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return (
      <div className={styles.staffSpotlight} style={{ 
        backgroundColor: props.backgroundColor || 'transparent',
        color: props.textColor || 'inherit'
      }}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
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
      </div>

      <div className={styles.separator} />

      {/* Content Section */}
      {spotlightItems.length === 0 ? (
        <div className={styles.noItems}>
          <Icon iconName="Emoji2" className={styles.noItemsIcon} />
          <div>No spotlight items found.</div>
        </div>
      ) : (
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
              <div 
                key={item.Id} 
                className={styles.spotlightCardWrapper}
              >
                <a 
                  href={item.Link || "#"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.spotlightCard}
                  style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${item.ImageURL || getDefaultImage()}')`,
                    backgroundColor: props.cardBackgroundColor || '#ffffff'
                  }}
                >
                  <div className={styles.cardContent}>
                    <div className={styles.cardDate} style={{ color: props.accentColor || '#0078d4' }}>
                      {formatDate(item.Created)}
                    </div>
                    <h3 className={styles.cardTitle}>{item.Title}</h3>
                    <p className={styles.cardDescription} style={{ color: props.bodyTextColor || '#ffffff' }}>
                      {item.Description}
                    </p>
                    
                    {item.Employee && (
                      <div className={styles.cardEmployeeInfo}>
                        <div className={styles.employeeProfile}>
                          <img 
                            src={getProfilePictureUrl(item.Employee.EMail)} 
                            alt={item.Employee.Title}
                            className={styles.profilePicture}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x50?text=User';
                            }}
                          />
                          <div className={styles.employeeDetails}>
                            <div className={styles.employeeName}>{item.Employee.Title}</div>
                            {item.Employee.JobTitle && (
                              <div className={styles.employeeJobTitle} style={{ color: props.bodyTextColor || '#ffffff' }}>
                                {item.Employee.JobTitle}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              </div>
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
      )}
    </div>
  );
};

export default StaffSpotlight;