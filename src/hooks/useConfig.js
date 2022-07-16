import {useState} from 'react;
import ENV from '@env';

/**
 *
 * @returns the environment variables as a state variable
 */
export default useConfig = () => {
  const [env, _] = useState(ENV);
  return env;
};
