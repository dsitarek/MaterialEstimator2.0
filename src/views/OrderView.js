import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialTypes, getJobMaterials } from '../data/dbCalls';

export default function OrderView() {
  // eslint-disable-next-line no-unused-vars
  const [materialTypes, setMaterialTypes] = useState([]);
  const [jobMaterials, setJobMaterials] = useState({});

  const { job } = useParams();

  const calculateJobMaterials = (mats) => {
    const totalMaterials = {};
    mats.forEach((material) => {
      totalMaterials[material.materialPN] = { totalLength: 0, totalSticks: 0, recommendedBundles: 0 };
    });
    mats.forEach((material) => {
      totalMaterials[material.materialPN].totalLength += material.materialLength;
    });
    mats.forEach((material) => {
      totalMaterials[material.materialPN].totalSticks = totalMaterials[material.materialPN].totalLength / material.stickLength;
      totalMaterials[material.materialPN].recommendedBundles = totalMaterials[material.materialPN].totalSticks / material.bundleQty;
    });

    const matsArray = [];

    (Object.entries(totalMaterials)).forEach(([key, value]) => matsArray.push({ [key]: value }));
    setJobMaterials(matsArray);
  };

  useEffect(() => {
    getMaterialTypes().then(setMaterialTypes);
    getJobMaterials(job).then((mats) => calculateJobMaterials(mats));
  }, []);

  return (
    <div>{jobMaterials ? jobMaterials.map((mat) => `${mat.totalLength}, ${mat.key}`) : 'na'}</div>
  );
}
