import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMaterialTypes, getJobMaterials } from '../data/dbCalls';

export default function OrderView() {
  // eslint-disable-next-line no-unused-vars
  const [materialTypes, setMaterialTypes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [jobMaterials, setJobMaterials] = useState({});

  const { job } = useParams();

  const calculateJobMaterials = (mats) => {
    const totalMaterials = {};
    mats.forEach((material) => {
      totalMaterials[material.description] = {
        totalLength: 0, totalSticks: 0, recommendedBundles: 0, materialPN: material.materialPN, bundlePartNumber: material.bundlePartNumber, bundleQty: material.bundleQty, description: material.description,
      };
    });
    mats.forEach((material) => {
      totalMaterials[material.description].totalLength += material.materialLength;
    });
    mats.forEach((material) => {
      totalMaterials[material.description].totalSticks = totalMaterials[material.description].totalLength / material.stickLength;
      totalMaterials[material.description].recommendedBundles = totalMaterials[material.description].totalSticks / material.bundleQty;
    });

    const matsArray = [];

    (Object.entries(totalMaterials)).forEach((value) => matsArray.push(...value));
    console.log(matsArray);
    setJobMaterials(matsArray);
  };

  useEffect(() => {
    getMaterialTypes().then(setMaterialTypes);
    getJobMaterials(job).then((mats) => calculateJobMaterials(mats));
  }, []);

  return (
    <div />
  );
}
