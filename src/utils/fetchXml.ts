import axios from 'axios';
import { ParserOptions, parseString } from 'xml2js';
import colors from 'colors';
import path from 'path';
import fs from 'fs';

export interface XmlData {
  svg: {
    symbol: Array<{
      $: {
        viewBox: string;
        id: string;
      };
      path: Array<{
        $: {
          d: string;
          fill?: string;
        };
      }>;
    }>;
  }
}

export const fetchXml = async (url: string): Promise<XmlData> => {
  console.log('Fetching iconfont data...');

  try {
    const { data } = /^(https?:)?\/\//.test(url) ? await axios.get<string>(url) : { data: fs.readFileSync(path.resolve(url)) };
    const matches = String(data).match(/'<svg>(.+?)<\/svg>'/);

    if (matches) {
      return new Promise<XmlData>((resolve, reject) => {
        parseString(`<svg>${matches[1]}</svg>`, { rootName: 'svg' } as ParserOptions,  (err: Error, result: XmlData) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    }

    throw new Error('You provide a wrong symbol url');
  } catch (e: any) {
    console.error(colors.red(e.message || 'Unknown Error'));
    process.exit(1);
  }
};
