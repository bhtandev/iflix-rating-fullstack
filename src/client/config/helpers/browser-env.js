import browserEnv from 'browser-env';

global.navigator = {
  userAgent: 'node.js'
};

var HTMLElement = typeof HTMLElement === 'undefined' ? function () {} : HTMLElement;

global.Element = HTMLElement;

global.HTMLElement = () => {};

global.NodeList = () => {};


global.HTMLCollection = () => {};


browserEnv(['window', 'document', 'Element']);
