import fs from 'fs';
import mkdirp from 'mkdirp';
import glob from 'glob';
import colors from 'colors';
import path, { basename } from 'path';
import { XmlData } from './fetchXml';
import { Config } from './getConfig';
import { generateCase } from "./util";

export const generateUni = (data: XmlData, config: Config) => {
  const svgFunctions: string[] = [];
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
    names.push(iconIdAfterTrim);
    svgFunctions.push(`export const ${iconIdAfterTrim} = ({quot, svgSize='${config.default_icon_size}', isStr, colors}) => {return \`background-image: url($\{quot\}data:image/svg+xml, ${generateCase(item, {hexToRgb: true})}$\{quot\}); width: $\{svgSize\}; height: $\{svgSize\};\`}`)
    console.log(`${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`);
  });

  fs.writeFileSync(path.join(saveDir, fileName + '.js'), svgFunctions.join('\n'));
  console.log(`\n${colors.green('√')} All icons have been putted into dir: ${colors.green(config.save_dir)}\n`);
}
