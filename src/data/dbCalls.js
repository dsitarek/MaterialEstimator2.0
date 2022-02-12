import { supabase } from '../api/auth';

const getMaterialTypes = async () => {
  const matsCall = await supabase
    .from('MaterialTypes')
    .select('*');

  console.log(matsCall.data);

  return matsCall.data;
};

// const createOrder = async (order) => {
//   const data = await supabase
//     .from('line_combinations')
//     .insert([
//       ...order.orderList,
//     ]);
//   return data;
// };

export default getMaterialTypes;
