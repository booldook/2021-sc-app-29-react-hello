/* 
1. 부모가 자식에게 값을 보낼때는 속성으로 보낸다 
2. 자식은 props로 값을 받는다.
3. 자식이 부모에게 값을 보낼때는 이벤트로 보낸다.
*/

class List extends React.Component {
  render() {
    return <h2 className="my-2">{this.props.value}</h2>;
  }
}

class Title extends React.Component {
  render() {
    return <h1 className="fa-2x my-5">{this.props.title}</h1>;
  }
}

class Search extends React.Component {
  onChangeInput = (e) => {
    this.props.onChangeTitle(e.target.value);
    // console.log(e.target.value);
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onChangeForm(e.target.query.value);
    e.target.query.value = '';
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onChangeInput}
          type="text"
          className="form-control"
          name="query"
          autoFocus
        />
      </form>
    );
  }
}

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
  changeForm = (value) => {
    this.setState({
      title: '',
      lists: [...this.state.lists, value],
    });
  };
  render() {
    return (
      <div className="container">
        <Title title={this.state.title} />
        <Search onChangeTitle={this.changeTitle} onChangeForm={this.changeForm} />
        <div className="my-4 border p-3">
          {this.state.lists.reverse().map((v, i) => (
            <List value={v} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
