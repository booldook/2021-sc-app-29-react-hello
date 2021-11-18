const { useState, useRef, useEffect } = React;
const { render } = ReactDOM;
const postURL = 'https://jsonplaceholder.typicode.com/posts';
const userURL = 'https://jsonplaceholder.typicode.com/users';

const Search = ({ changeInput }) => {
  const styleClose = { right: '1em', cursor: 'pointer' };
  const [query, setQuery] = useState('');
  const queryRef = useRef(null);
  const onChange = (e) => {
    setQuery(e.target.value);
    changeInput(e.target.value);
  };
  const onClose = (e) => {
    setQuery('');
    changeInput('');
    queryRef.current.focus();
  };
  return (
    <form className="my-4 d-flex align-items-center position-relative">
      <h3 className="mr-3 font-weight-bold flex-shrink-0">검색어: </h3>
      <input
        onChange={onChange}
        ref={queryRef}
        className="form-control"
        autoFocus
        placeholder="검색할 단어를 적어주세요"
        value={query}
      />
      {query.length ? (
        <i
          className="fa fa-times position-absolute"
          style={styleClose}
          onClick={onClose}
        />
      ) : (
        ''
      )}
    </form>
  );
};

const Lists = ({ changeSort, posts }) => {
  const styleCaret = { cursor: 'pointer' };
  const [sort, setSort] = useState('asc');
  const onChangeDesc = (e) => {
    setSort('desc');
    changeSort('desc');
  };
  const onChangeAsc = (e) => {
    setSort('asc');
    changeSort('asc');
  };
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
          <th>
            번호
            {sort === 'asc' ? (
              <i
                className="fa fa-caret-down"
                style={styleCaret}
                onClick={onChangeDesc}
              />
            ) : (
              <i
                className="fa fa-caret-up"
                style={styleCaret}
                onClick={onChangeAsc}
              />
            )}
          </th>
          <th>제목</th>
          <th>작성자</th>
          <th>내용</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post, idx) => (
          <List post={post} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

const List = ({ post }) => {
  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.name}</td>
      <td>{post.body}</td>
    </tr>
  );
};

const App = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const changeInput = (value) => {
    setSearchPosts(
      allPosts.filter(
        (post) => post.title.includes(value) || post.body.includes(value)
      )
    );
  };
  const changeSort = (value) => {
    setSearchPosts(
      value === 'asc'
        ? _.sortBy(searchPosts, 'id')
        : _.sortBy(searchPosts, 'id').reverse()
    );
  };

  /*
  useEffect(() => {
    componentDidMount()
    return () => {} <-- componentWillUnmount()
  }, [searchPosts] <-- update할 스테이트 ) 
  */

  useEffect(async () => {
    try {
      const { data: posts } = await axios.get(postURL);
      const { data: users } = await axios.get(userURL);
      posts.forEach((post) => {
        let [{ name }] = users.filter((user) => user.id === post.userId);
        post.name = name;
      });
      setAllPosts(posts);
      setSearchPosts(posts);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="container">
      <Search changeInput={changeInput} />
      <Lists posts={searchPosts} changeSort={changeSort} />
    </div>
  );
};

render(<App />, document.querySelector('#app'));
