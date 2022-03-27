#!/usr/bin/env node
import colors from 'colors';
import { getConfig } from '../utils/getConfig';
import { fetchXml } from '../utils/fetchXml';
import { generateUni } from '../utils/generateUni'

const config = getConfig();

fetchXml(config.symbol_url).then((result) => {
  generateUni(result, config);
}).catch((e) => {
  console.error(colors.red(e.message || 'Unknown Error'));
  process.exit(1);
});
