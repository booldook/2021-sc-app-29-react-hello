/****** Search ******/
class Search extends React.Component {
  onChange = (e) => {
    this.props.changeTitle(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitForm(e.target.query.value);
    e.target.query.value = '';
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChange}
          type="text"
          className="form-control"
          name="query"
          autoFocus
        />
      </form>
    );
  }
}

/****** Title *******/
class Title extends React.Component {
  render() {
    return <h1 className="my-4 fa-2x">{this.props.title}</h1>;
  }
}

/******* List *******/
class List extends React.Component {
  render() {
    return <li className="my-2 p-1 border-bottom">{this.props.value}</li>;
  }
}

/******** App *******/
class App extends React.Component {
  state = {
    title: '',
    lists: [],
  };
  changeTitle = (value) => {
    this.setState({
      ...this.state,
      title: value,
    });
  };
  submitForm = (value) => {
    this.setState({
      ...this.state,
      title: '',
      lists: [value, ...this.state.lists],
    });
  };
  render() {
    return (
      <div className="container">
        <Title title={this.state.title} />
        <Search changeTitle={this.changeTitle} submitForm={this.submitForm} />
        <ul className="border rounded p-3 my-3">
          {this.state.lists.map((v, i) => (
            <List value={v} key={i} />
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
