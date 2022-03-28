import fs from 'fs';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import path, { basename } from 'path';
import { XmlData } from './fetchXml';
import { Config } from './getConfig';
import { getTemplate } from './getTemplate';
import { generateCase, hyphen2Hump } from "./util";

export const generateUni = (data: XmlData, config: Config) => {
  const SIGN = 'uni';
  const filePrefix = '/* eslint-disable */';
  const svgFunctions: string[] = [filePrefix];
  const names: string[] = [];
  const saveDir = path.resolve(config.save_dir);
  const fileName = basename(config.save_dir) || 'iconfont';

  mkdirp.sync(saveDir);
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file));

  data.svg.symbol.forEach(item => {
    const iconId = item.$.id;
    const iconIdAfterTrim = config.trim_icon_prefix
      ? iconId.replace(
        new RegExp(`^${config.trim_icon_prefix}(.+?)$`),
        (_, value) => value.replace(/^[-_.=+#@!~*]+(.+?)$/, '$1')
      )
      : iconId;
    const functionName = hyphen2Hump(`${SIGN}_${iconIdAfterTrim}`);
    names.push(functionName);
    svgFunctions.push(`const ${functionName} = ({quot, svgSize='${config.default_icon_size}', isStr, colors}) => {return \`background-image: url($\{quot\}data:image/svg+xml, ${generateCase(item, {hexToRgb: true})}$\{quot\}); width: $\{svgSize\}; height: $\{svgSize\};\`}`)
    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  svgFunctions.push(`export default {${names.join(',')}}`);

  fs.writeFileSync(path.join(saveDir, fileName + '.js'), svgFunctions.join('\n'));
  fs.writeFileSync(path.join(saveDir, fileName + '.vue'), getTemplate('iconfont.vue').replace(/#name#/g, fileName));
  console.log(`\n${colors.green('√')} All icons have been putted into dir: ${colors.green(config.save_dir)}\n`);
}
