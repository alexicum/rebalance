module.exports = {
  use: [
    '@neutrinojs/airbnb',
    [
      '@neutrinojs/react',
      {
        html: {
          links: [
            '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css'
          ],
          title: 'rebalance'
        }
      }
    ],
    '@neutrinojs/jest'
  ],
  options: {
    output: 'docs',
  }
};
