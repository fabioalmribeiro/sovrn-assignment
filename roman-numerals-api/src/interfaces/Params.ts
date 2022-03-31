import type { ParsedQs } from 'qs';

interface Params extends ParsedQs {
  inputValue?: string
}

export default Params;
