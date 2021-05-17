import CMS from 'netlify-cms-app'

import ArticlePreview from './previews/ArticlePreview'

CMS.registerEditorComponent({
  id: 'affililateButton',
  label: 'Affililate Button',
  fields: [
    {
      name: 'link',
      label: 'Link',
      widget: 'relation',
      collection: 'affiliateLinks',
      value_field: 'id',
      search_fields: ['id', 'link'],
      display_fields: ['id', 'link'],
    },
  ],
  pattern: /^@data-link="([^"]+)"$/,
  fromBlock: function (match) {
    return {
      link: match[1],
    }
  },
  toBlock: function (obj) {
    return '@data-link="' + obj.link + '"'
  },
  toPreview: function (obj) {
    return obj.link === 'undefined'
      ? ''
      : '<a class="buy-button" href="#">' + obj.link + '</a>'
  },
})

CMS.registerEditorComponent({
  id: 'tableOfContent',
  label: 'Table of content',
  fields: [
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
      default: 'Table of content',
    },
  ],
  pattern: /^#### ([^\n]+)\n```toc\n```$/,
  fromBlock: function (match) {
    return {
      title: match[1],
    }
  },
  toBlock: function (obj) {
    return '#### ' + obj.title + '\n```toc\n```'
  },
  toPreview: function (obj) {
    return '[[' + obj.title + ']]'
  },
})

CMS.registerPreviewTemplate('article', ArticlePreview)
