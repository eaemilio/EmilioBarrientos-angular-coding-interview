module.exports = {
  prefix: '',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '4/10': '40%',
        '5/10': '50%',
        '6/10': '60%',
        '7/10': '70%',
        '8/10': '80%',
        '9/10': '90%',
      }
    },
    colors: {
      'off-black': '#14142B',
      'off-white': '#FFFFFF',
      'primary': {
        'dark': '#303F9F',
        'default': '#3F51B5',
        'light': '#C5CAE9',
        'text': '#212121'
      },
      'secondary': {
        'text': '#757575',
        'default': '#03A9F4'
      },
      'divider': '#BDBDBD',
      'transparent': 'rgba(0,0,0,0)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    // We use the strategy class to avoid undesired classes on elements
    require("@tailwindcss/forms")
  ],
};
