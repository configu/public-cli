const templateUrlMap = {
    'koa2-server': 'configu/template-koa2-server'
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
    ]
}

exports.getTemplatesList = getTemplatesList;
exports.getLicenseList = getLicenseList;
exports.getTemplateUrlMap = getTemplateUrlMap;


