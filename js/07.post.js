const { Component, createRef } = React;
const { render } = ReactDOM;
const postURL = 'https://jsonplaceholder.typicode.com/posts';

class Search extends Component {
  btClose = { right: '1em', cursor: 'pointer' };
  render() {
    return (
      <form className="my-4 d-flex align-items-center position-relative">
        <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어: </h3>
        <input className="form-control" autoFocus />
        <i className="fa fa-times position-absolute" style={this.btClose} />
      </form>
    );
  }
}

class Lists extends Component {
  render() {
    return (
      <table className="table my-3">
        <colgroup>
          <col width="80"></col>
          <col></col>
          <col width="180"></col>
          <col></col>
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {this.props.posts.map((post, idx) => (
            <List post={post} key={idx} />
          ))}
        </tbody>
      </table>
    );
  }
}

class List extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.post.id}</td>
        <td>{this.props.post.title}</td>
        <td>{this.props.post.userId}</td>
        <td>{this.props.post.body}</td>
      </tr>
    );
  }
}

class App extends Component {
  state = {
    query: '',
    allPosts: [],
    searchPosts: [],
  };
  async componentDidMount() {
    try {
      const { data: posts } = await axios.get(postURL);
      this.setState({
        ...this.state,
        allPosts: [...posts],
        searchPosts: [...posts],
      });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="container">
        <Search />
        <Lists posts={this.state.searchPosts} />
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
