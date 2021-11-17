const { useState, useRef, useMemo, useCallback, useEffect } = React;

const List = ({ title }) => {
  return <li className="mb-2 py-2 border-bottom">{title}</li>;
};

const Title = ({ title }) => {
  return <h1 className="my-3 fa-2x">{title}</h1>;
};

const Search = ({ changeInput, changeForm }) => {
  const queryRef = useRef(null);
  const onChange = (e) => {
    changeInput(queryRef.current.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    changeForm(queryRef.current.value);
    queryRef.current.value = '';
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        ref={queryRef}
        onChange={onChange}
        type="text"
        name="query"
        className="form-control"
        autoFocus
      />
    </form>
  );
};

const App = () => {
  const [title, setTitle] = useState('');
  const [lists, setLists] = useState([]);
  const changeInput = (value) => {
    setTitle(value);
  };
  const changeForm = (value) => {
    setLists([value, ...lists]);
  };

  return (
    <div className="container">
      <Title title={title} />
      <Search changeInput={changeInput} changeForm={changeForm} />
      <ul className="border rounded my-3 p-3">
        {lists.map((v, i) => (
          <List title={v} key={i} />
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#app'));
