// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

const lightModeColors = {
  primary600: '#189577',
  primary500: '#21CEA5',

  secondary500: '#7562B8',

  neutralBlack: '#232222',
  neutralGrey800: '#5F5F5F',
  neutralGrey700: '#808080',
  neutralGrey600: '#C1C1C1',
  neutralGrey500: '#E8E8E8',
  neutralGrey200: '#F3F3F3',
  neutralGrey100: '#F8F7F4',
  neutralWhite: '#FFFFFF',

  actionUp500: '#098551',
  actionDown500: '#BE3436',
  action500: '#892527',
  action400: '#CE2E38',
  action200: '#FFF5F7',
}

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './index.html',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: {
          primary: lightModeColors.neutralWhite,
          secondary: lightModeColors.neutralGrey100,
        },
        border: {
          primary: lightModeColors.neutralGrey500,
        },
        button: {
          primary: lightModeColors.primary500,
          primaryHover: lightModeColors.neutralGrey100,
          primaryText: lightModeColors.neutralBlack,

          secondary: lightModeColors.neutralWhite,
          secondaryHover: lightModeColors.neutralGrey100,
          secondaryBorder: lightModeColors.neutralBlack,
          secondaryText: lightModeColors.neutralBlack,
        },
        form: {
          textPrimary: lightModeColors.neutralBlack,
          textSecondary: lightModeColors.neutralGrey700,
          border: lightModeColors.neutralGrey600,
          borderSelected: lightModeColors.neutralGrey800,
          background: lightModeColors.neutralWhite,
          backgroundActive: lightModeColors.neutralGrey100,
          selected: lightModeColors.primary500,
          textError: lightModeColors.action500,
          backgroundError: lightModeColors.action200,
        },
        icon: {
          primary: lightModeColors.neutralBlack,
          secondary: lightModeColors.neutralGrey700,
          up: lightModeColors.actionUp500,
          down: lightModeColors.actionDown500,
        },
        link: {
          primary: lightModeColors.neutralBlack,
          secondary: lightModeColors.neutralGrey800,
          hoverBackground: lightModeColors.neutralGrey200,
          activeBackground: lightModeColors.neutralGrey600,
        },
        mobileMenu: {
          background: lightModeColors.neutralWhite,
          border: lightModeColors.neutralGrey600,
          icon: lightModeColors.neutralBlack,
        },
        overlay: {
          textPrimary: lightModeColors.neutralWhite,
          textSecondary: lightModeColors.neutralGrey800,
          background: lightModeColors.neutralGrey600,
        },
        tag: {
          backgroundPrimary: lightModeColors.tetriary400,
          textPrimary: lightModeColors.neutralBlack,
          backgroundSecondary: lightModeColors.neutralBlack,
          textSecondary: lightModeColors.neutralWhite,
        },
        text: {
          primary: lightModeColors.neutralBlack,
          secondary: lightModeColors.neutralGrey700,
          tetriary: lightModeColors.neutralWhite,
          up: lightModeColors.actionUp500,
          down: lightModeColors.actionDown500,
        },
      },
      lineHeight: {
        '3.5': '14px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
