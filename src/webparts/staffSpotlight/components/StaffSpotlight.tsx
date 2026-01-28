/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react';
//import styles from './StaffSpotlight.module.scss';
import type { ISpotLightItem, IStaffSpotlightProps } from './IStaffSpotlightProps';
import { SPFx, spfi } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { Placeholder } from '@pnp/spfx-controls-react';

const StaffSpotlight: React.FC<IStaffSpotlightProps> = (props) => {
const [spotlightItems, setSpotlightItems] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [errorMessage, setErrorMessage] = useState<string | null>(null);
const spRef =useRef<any>(null);

   const loadSPotLightItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
 
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
          "JobRole"
        )
        .expand("Employee")
        .filter("Status eq 1")
        .orderBy("Created", false)();
 
 
      setSpotlightItems(items);
      setIsLoading(false);

    } catch (error) {
      console.error('Error loading spotlight items:', error);
      setIsLoading(false);
      setErrorMessage(`Failed to load spotlight items. Please check if the list "${props.listTitle}" exists and you have permissions. Error: ${error.message}`);
    }
  }, [props.listTitle]);
   useEffect(() => {    spRef.current = spfi().using(SPFx(props.context));
    void loadSPotLightItems();},
    [props.listTitle, props.context]);
if (isLoading) {
    return (
<div >
<div >
<div >

<div >Loading items...</div>
</div>
</div>
</div>
    );
  }
 
  if (errorMessage) {
    return (
<div >
<div >
<Placeholder
            iconName='Error'
            iconText='Error'
            description={errorMessage}
>
<button
           
              onClick={() => loadSPotLightItems()}
>
              Retry
</button>
</Placeholder>
</div>
</div>
    );
  }

    return (
        <div>
<div >
<div >
<h1 >STAFF SPOTLIGHT</h1>

</div>
 
        <div>
          {spotlightItems.length === 0 ? (
<div >
<div>No spotlight items found.</div>

</div>
          ) : (
            spotlightItems.map((item: ISpotLightItem) => (
<a 
                key={item.Id} 
                href={item.Link || "#"}
 
                target="_blank" 
                rel="noopener noreferrer"
>
<div >
<span >{item.Title}</span>
</div>
</a>
            ))
          )}
</div>
</div>
</div>
    );
  }

export default StaffSpotlight;