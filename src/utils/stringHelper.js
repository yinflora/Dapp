import {
  STRING_MAX_LENGTH,
  STRING_PREFIX_LENGTH,
  STRING_SUFFIX_LENGTH,
} from '../utils/config';

const truncateMiddleString = (string) => {
  if (string.length <= STRING_MAX_LENGTH) return string;

  const prefix = string.substring(0, STRING_PREFIX_LENGTH);
  const suffix = string.substring(string.length - STRING_SUFFIX_LENGTH);

  return `${prefix}...${suffix}`;
};

export { truncateMiddleString };
