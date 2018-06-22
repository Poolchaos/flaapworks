// import { Eventing } from './services/eventing';
// import { Router } from './services/router';
import { Logger } from './services/logger';
// import { Flaapworks } from './services/flaapworks';

Logger.logLevel = Logger.LOG_LEVELS.DEBUG;
const logger: Logger = new Logger('Index');

// // logger.debug('this is a test');
// // logger.info('this is a test');
// // logger.error('this is a test');
// // new Router();

// (async function() {
//   logger.debug('initialising app');
//   await Flaapworks.withRouter();
//   await Flaapworks.initialise();
//   logger.exclaim('FLAAP-APP INITALISED');
// })();
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var VText = require("virtual-dom/vnode/vtext")
var createElement = require('virtual-dom/create-element');

////////////////////////////////////////////////////////
 
import { RequestService } from './services/request-service';
var parser = require('parse5');

const DOC_TYPES = { DOCUMENT: '#document', HTML: 'html', HEAD: 'head', TEMPLATE: 'template' };
const HASH_TYPES: any = ['#text'];

function getContent(dom: any): any {
  try {
    switch(dom.nodeName) {
      case DOC_TYPES.DOCUMENT: return getContent(dom.childNodes[0]);
      case DOC_TYPES.HTML: return getContent(dom.childNodes[0]);
      case DOC_TYPES.HEAD: return getContent(dom.childNodes[0]);
      case DOC_TYPES.TEMPLATE: return dom.content.childNodes;
      default: throw new Error('Unable to map document. Do you have a template?');
    }
  } catch(e) {
    logger.error('Failed to get Content:', {
      cause: e,
      failed_on_dom: dom
    });
  }
}

async function structureTemplate(domNodes: any[], isChildren?: boolean): Promise<any> {
  let _data: any = isChildren ? null : [];
  let _children: any[] = isChildren ? [] : null;
  
  for(let node of domNodes) {
    let identity: string = generateTagIdentity(node);
    let value: any = await getNodeValue(node);
    let children: any = await getChildNodes(node);

    if(isChildren) {
      _children.push(HASH_TYPES.includes(identity) ? new VText(value) : h(identity, value || children));
    } else {
      _data.push(HASH_TYPES.includes(identity) ? new VText(value) : h(identity, value || children));
    }
  }
  
  return _children || _data;
}

async function getChildNodes(node: any): Promise<any[]> {
  if(node.childNodes && node.childNodes.length > 0) {
    return await structureTemplate(node.childNodes, true);
  }
  return null
}

async function getNodeValue(node: any): Promise<any> {
  switch(node.nodeName) {
    case '#text': return node.value;
  }
  return null;
}

function generateTagIdentity(node: any): string {
  let name: string = node.nodeName || '';
  if(node.attrs && node.attrs.length > 0) {
    for(let attr of node.attrs) {
      switch(attr.name) {
        case 'id': name += `#${attr.value}`;
          break;
        case 'class': name += `.${attr.value}`;
          break;
        default: break;
      }
    }
  }
  return name;
}

async function buildTemplate(templateURL: string) {
  let templateString = await RequestService.fetch(templateURL).asHtml();
  let dom = parser.parse(templateString);
  let templateContent = await getContent(dom);
  let forest = await structureTemplate(templateContent);

  for(let tree of forest) {
    var rootNode = createElement(tree);
    document.body.appendChild(rootNode);
  }
}

buildTemplate('views/pagetwo/page-two');
