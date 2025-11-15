// Breadcrumb.js
import React from 'react';
import { useMatches } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { Link } from "react-router-dom";

export default function BreadCrumb() {
  const crumbs = useBreadcrumbs();

  console.log({ crumbs });  

  // Extract breadcrumb data from the route
  const breadcrumbs = crumbs?.filter((route) => route.path !== '*');

  return (
    <div style={{width:"100%", height:"50px", color:"white", backgroundColor:"black", display:"flex", alignItems:"center", paddingLeft:"16px"}}>
      {breadcrumbs &&
        breadcrumbs.map((crumb, index) => {
            console.log({ crumb });
            return (<div key={index}>
                <Link to={crumb.location.pathname}>{crumb.location.pathname}</Link>
                {index < breadcrumbs.length - 1 && ' / '}
            </div>) 
            }
        )}
    </div>
  );
};
