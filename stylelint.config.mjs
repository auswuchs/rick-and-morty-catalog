export default {
  extends: ['stylelint-config-standard'],
  plugins: ['@stylistic/stylelint-plugin', 'stylelint-order'],
  rules: {
    '@stylistic/indentation': 2,
    '@stylistic/no-eol-whitespace': true,
    '@stylistic/no-missing-end-of-source-newline': true,

    'no-empty-source': null,
    'selector-class-pattern': null,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'max-nesting-depth': [3, { ignoreAtRules: ['media'] }],
    'shorthand-property-no-redundant-values': true,
    'color-hex-length': 'short',
    'number-max-precision': 4,
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-max-id': 0,
    'no-descending-specificity': null,

    'order/properties-order': [
      [
        'position', 'inset', 'top', 'right', 'bottom', 'left', 'z-index',

        'display', 'flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-basis',
        'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
        'grid-auto-flow', 'grid-auto-columns', 'grid-auto-rows', 'grid-column', 'grid-row', 'grid-area',
        'gap', 'row-gap', 'column-gap',
        'place-content', 'justify-content', 'align-content', 'place-items', 'justify-items', 'align-items',
        'place-self', 'justify-self', 'align-self', 'order',

        'box-sizing', 'width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'aspect-ratio',
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'overflow', 'overflow-x', 'overflow-y',

        'font', 'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing',
        'text-align', 'text-decoration', 'text-transform', 'text-overflow', 'white-space', 'word-break', 'color',

        'background', 'background-color', 'background-image', 'background-position', 'background-size',
        'background-repeat', 'border', 'border-top', 'border-right', 'border-bottom', 'border-left',
        'border-width', 'border-style', 'border-color', 'border-radius', 'outline', 'outline-offset',
        'box-shadow', 'opacity', 'visibility', 'object-fit',

        'transition', 'animation', 'transform',

        'cursor', 'pointer-events', 'user-select', 'content',
      ],
      { unspecified: 'bottom' },
    ],
  },
}
