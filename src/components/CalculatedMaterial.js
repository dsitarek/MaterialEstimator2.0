import React from 'react';
import PropTypes from 'prop-types';

export default function CalculatedMaterial({ material }) {
  const recommendedSticks = material.totalSticks >= 0 ? Math.round(material.totalSticks * 1.15) : 0;
  const recommendedBundles = recommendedSticks / (material.bundleQty * 0.75);
  const leftOverSticks = () => {
    if (recommendedSticks > material.bundleQty) { return recommendedSticks % material.bundleQty; }
    return 0;
  };

  return (
    <div>
      <ul>
        <li><h5>{material.description}</h5></li>
        <li> PartNumber: <b>{material.materialPN}</b></li>
        <li> totalSticks: {material.totalSticks >= 0 ? Math.floor(material.totalSticks * 100) / 100 : 0}</li>
        <li> recommendedSticks: {recommendedSticks}</li>
        <li> totalLength: {Math.round(material.totalLength * 100) / 100}&#34;</li>
        <li>recommendedBundles: {recommendedBundles >= 1 ? `${Math.floor(recommendedBundles)} (${leftOverSticks()} left over sticks)` : 0}</li>
      </ul>
    </div>
  );
}

CalculatedMaterial.propTypes = PropTypes.shape({
  totalLength: PropTypes.number,
  totalSticks: PropTypes.number,
  recommendedBundles: PropTypes.number,
  materialPN: PropTypes.string,
  bundlePartNumber: PropTypes.string,
  bundleQty: PropTypes.number,
  description: PropTypes.string,
}).isRequired;
