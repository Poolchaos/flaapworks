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
var createElement = require('virtual-dom/create-element');

////////////////////////////////////////////////////////
 
import { RequestService } from './services/request-service';
var parser = require('parse5');

const DOC_TYPES = { DOCUMENT: '#document', HTML: 'html', HEAD: 'head', TEMPLATE: 'template' };

function getContent(dom: any): any {
  logger.info(' ::>> getContent >>>> ', dom);
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
  let _data: any = {};
  let _children: any[] = isChildren ? [] : null;
  
  for(let node of domNodes) {
    let identity = generateTagIdentity(node);
    let children: any = await getChildNodes(node);
    let value: any = await getNodeValue(node);
    // logger.info(' ::>> mapping >>>>> ', { identity, children, value });
    if(isChildren) {
      let obj: any = {};
      // obj[generateTagIdentity(node)]  = value || children;
      logger.info(' ::>> pushing child ', h(generateTagIdentity(node), value || children));
      _children.push(h(generateTagIdentity(node), value || children));
    } else {
      // _data[generateTagIdentity(node)] = value || children;
      logger.info(' ::>> creating entity ', h(generateTagIdentity(node), value || children));
      _data = h(generateTagIdentity(node), value || children);
    }

    // _data = h(generateTagIdentity(node), value || children);
  }
  logger.exclaim(' :> _data > ', _data);
  logger.exclaim(' :> _children > ', _children);
  
  return _children || _data;
}

// var tree = h('div.foo#some-id', [
//   h('span', 'some text'),
//   h('input', { type: 'text', value: 'foo' })
// ])

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
  logger.debug(' ::>> template >>>>> ', templateString);
  let dom = parser.parse(templateString);
  logger.debug(' ::>> template >>>>> ', dom);
  let templateContent = await getContent(dom);
  logger.debug(' ::>> templateContent >>>>> ', templateContent);
  let tree = await structureTemplate(templateContent);
  console.log(' ::>> tree >>>>>> ', tree);
  // var tree = render(count);
  var rootNode = createElement(tree);
  document.body.appendChild(rootNode);
}

buildTemplate('views/pagetwo/page-two');

///////////////////////////////////////////////////////////
 
// 1: Create a function that declares what the DOM should look like
function render(count: number)  {
  return h('div', {
    style: {
      textAlign: 'center',
      lineHeight: (100 + count) + 'px',
      border: '1px solid red',
      width: (100 + count) + 'px',
      height: (100 + count) + 'px'
    }
  }, [String(count)]);
}

// 2: Initialise the document
// var count = 0;      // We need some app data. Here we just store a count.
 
// var tree = render(count);               // We need an initial tree
// var rootNode = createElement(tree);     // Create an initial root DOM node ...
// document.body.appendChild(rootNode);    // ... and it should be in the document
 
// // 3: Wire up the update logic
// setInterval(function () {
//   count++;

//   var newTree = render(count);
//   var patches = diff(tree, newTree);
//   rootNode = patch(rootNode, patches);
//   tree = newTree;
// }, 1000);