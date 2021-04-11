import CMS from 'netlify-cms-app'

CMS.registerEditorComponent({
  id: 'affililateButton',
  label: 'Affililate Button',
  fields: [
    { name: 'text', label: 'Text', widget: 'string' },
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
  pattern: /^<a class="buy-button" rel="nofollow noreferrer noopener" target="_blank" data-href="([^"]+)">([^<]+)<\/a>$/,
  fromBlock: function (match) {
    return {
      link: match[1],
      text: match[2],
    }
  },
  toBlock: function (obj) {
    return (
      '<a class="buy-button" rel="nofollow noreferrer noopener" target="_blank" data-href="' +
      obj.link +
      '">' +
      obj.text +
      '</a>'
    )
  },
})
