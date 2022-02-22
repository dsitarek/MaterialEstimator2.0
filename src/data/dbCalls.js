import { supabase } from '../api/auth';

const getMaterialTypes = async () => {
  const { data, error } = await supabase
    .from('MaterialTypes')
    .select('*');

  return data || console.error(error);
};

const createOrder = async (order) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([
      ...order,
    ]);
  return data || console.error(error);
};

const getJobOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('jobNumber');

  const jobNumbers = new Set();

  data.forEach((order) => jobNumbers.add(order.jobNumber));

  return [...jobNumbers] || console.error(error);
};

const getJobMaterials = async (jobNumber) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('jobNumber', jobNumber);

  return data || console.error(error);
};

export {
  getMaterialTypes, createOrder, getJobOrders, getJobMaterials,
};
