module.exports = {
  transforms: {
    SETUP(content, options) {
      return [
        '',
        '```html',
        require('child_process')
          .execSync(`node html.js`)
          .toString()
          .trim(),
        '```',
        '',
      ].join('\n')
    },
  },
}
