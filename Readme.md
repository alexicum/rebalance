###Components
  Spent time selecting components.

  At first `Material-UI` were installed, but because of their complexity and lack of ComboBox took `React.Semantic-UI`.

### Libs & conceptions
- used functional setState: setState((state, props) => {});
- wrote stateUtils - functions helping in component state control of:
  - UI state (errors, touched controls),
  - fields values of the form.
- axios;
- axios-mock-adapter - to create fake api server;
- [trashable-react](https://github.com/hjylewis/trashable-react):
  - request promise would be cancelled & nulled in componentWillUnmount and Component would be garbage collected.
- react-router.

###TODO
- Send operator as prop to components: do not use history.push state.
- Use axios.cancel instead of trashable-react.
