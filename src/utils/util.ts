import { XmlData } from "./fetchXml";
import { replaceHexToRgb } from "./replace";

const ATTRIBUTE_FILL_MAP = ['path'];

export const generateCase = (data: XmlData['svg']['symbol'][number], config?: {
  hexToRgb:boolean,
}) => {
  let template = `<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>`;

  for (const domName of Object.keys(data)) {
    if (domName === '$') {
      continue;
    }

    const counter = {
      colorIndex: 0,
    };

    if (data[domName].$) {
      template += `<${domName}${addAttribute(domName, data[domName], counter, config)} />`;
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub: { $: { d: string; fill?: string | undefined; }; }) => {
        template += `<${domName}${addAttribute(domName, sub, counter, config)} />`;
      });
    }
  }

  template += `</svg>`;

  return template.replace(/<|>/g, (matched) => encodeURIComponent(matched));
};

const addAttribute = (domName: string, sub: XmlData['svg']['symbol'][number]['path'][number], counter: { colorIndex: number },  config?: {
  hexToRgb:boolean
}) => {
  let template = '';

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333';
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        let color :string | undefined;
        let keyword: string;
        if(config?.hexToRgb){
          color = replaceHexToRgb(sub.$[attributeName]);
          keyword = 'colors'
        }else {
          keyword = 'color'
          color = sub.$[attributeName]
        }
        template += ` ${attributeName}='$\{(isStr ? ${keyword} : ${keyword}[${counter.colorIndex}]) || '${color}'\}'`;
        counter.colorIndex += 1;
      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`;
      }
    }
  }

  return template;
};

export const hyphen2Hump = (str: string) => {
  return str.replace(/-(\w)/g, (_match, letter) => letter.toUpperCase());
}
