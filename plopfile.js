module.exports = (plop) => {
  plop.setHelper('upperCase', (txt) => txt.toUpperCase());
  plop.setHelper('capitalize', (txt) => txt.charAt(0).toUpperCase() + txt.slice(1));
  plop.setGenerator('module', {
    description: 'Generate a new state module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'States name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/state/actions/{{name}}.js',
        templateFile: '.templates/state/action.hbs',
      },
      {
        type: 'add',
        path: 'src/state/constants/{{name}}.js',
        templateFile: '.templates/state/constant.hbs',
      },
      {
        type: 'add',
        path: 'src/state/reducers/{{name}}.js',
        templateFile: '.templates/state/reducer.hbs',
      },
      {
        type: 'add',
        path: 'src/state/sagas/{{name}}.js',
        templateFile: '.templates/state/saga.hbs',
      },
      {
        type: 'add',
        path: 'src/state/selectors/{{name}}.js',
        templateFile: '.templates/state/selector.hbs',
      },
    ],
  });
};
