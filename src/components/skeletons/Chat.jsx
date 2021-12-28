import React from 'react';
import ContentLoader from 'react-content-loader';

export default () => (
  <ContentLoader 
    speed={2}
    width={500}
    height={200}
    viewBox="0 0 500 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="88" height="10" /> 
    <rect x="0" y="18" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="42" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="58" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="74" rx="3" ry="3" width="178" height="6" />

    <rect x="0" y="100" rx="3" ry="3" width="88" height="10" /> 
    <rect x="0" y="118" rx="3" ry="3" width="52" height="6" /> 
    <rect x="0" y="142" rx="3" ry="3" width="410" height="6" /> 
    <rect x="0" y="158" rx="3" ry="3" width="380" height="6" /> 
    <rect x="0" y="174" rx="3" ry="3" width="178" height="6" />
  </ContentLoader>
);