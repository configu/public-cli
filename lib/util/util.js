const templateUrlMap = {
  'koa2-server': 'wiseowner/template-koa2-server',
  'react-mobx': 'wiseowner/template-react-mobx',
  'react-redux': 'wiseowner/template-react-redux',
  'react-library': 'wiseowner/template-react-library',
  'ts-react-library': 'wiseowner/template-ts-react-library'
};

function getTemplateUrlMap() {
  return templateUrlMap;
}

function getTemplatesList() {
  return Object.keys(templateUrlMap);
}

function getLicenseList() {
  return [
    'private',
    'MIT',
    'ISC',
    'Apache-2.0',
    'GPL-2.0',
    'GPL-3.0',
  ];
}

exports.getTemplatesList = getTemplatesList;
exports.getLicenseList = getLicenseList;
exports.getTemplateUrlMap = getTemplateUrlMap;


