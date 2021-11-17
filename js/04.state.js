/* 
1. 부모가 자식에게 값을 보낼때는 속성으로 보낸다 
2. 자식은 props로 값을 받는다.
3. 자식이 부모에게 값을 보낼때는 이벤트로 보낸다.
*/

class List extends React.Component {
  render() {
    return <h2 className="my-2">자식 컴포넌트 List</h2>;
  }
}

class Title extends React.Component {
  render() {
    return <h1 className="fa-2x my-2">자식컴포넌트 Title</h1>;
  }
}

class Search extends React.Component {
  render() {
    return (
      <form>
        <input type="text" className="form-control" name="query" autofocus />
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Title />
        <Search />
        <div className="my-4 border p-3">
          <List />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
