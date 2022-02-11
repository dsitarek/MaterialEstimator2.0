import { supabase } from '../api/auth';

const getMaterialTypes = async () => {
  const matsCall = await supabase
    .from('MaterialTypes')
    .select('*');

  console.log(matsCall.data);

  return matsCall.data;
};

export default getMaterialTypes;
