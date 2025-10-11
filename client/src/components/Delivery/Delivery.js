import React from 'react';
import '../Delivery/DeliveryStyles.css';
import ExploreSection from '../exploreSection/ExploreSection';

export const DeliveryFilters = [
  {
    id: 1,
    title: "Filters"
  },
];

const Delivery = () => {
  return (
    <div>
      <ExploreSection  />
    </div>
  )
}

export default Delivery;