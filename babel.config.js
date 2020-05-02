const presets = [
  [
    '@babel/env',
    {
      targets: { // указать цели, для полифилов
        esmodules: true,
        android: '67',
        ios: '12',
        edge: '17',
        firefox: '60',
        chrome: '64',
        safari: '11.1',
      },
      useBuiltIns: 'usage', // эта настройка babel-polyfill, если стоит значение usage, то будут подставлятся полифилы для версий браузеров которые указали ниже.
      corejs: '3.1.4', // явно проставить версию corejs
    },
  ],
];


