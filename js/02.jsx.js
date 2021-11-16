const app = document.querySelector('#app');
const el = <h1>Hello, React</h1>;

const user = [
  { name: '홍길동', age: 25 },
  { name: '홍길순', age: 32 },
  { name: '홍길만', age: 28 },
];
const el2 = (
  <div>
    {/* jsx 주석 */}
    {/* jsx의 최상위 root는 하나의 태그로 구성된다. */}
    {/* jsx에서는 표현식(삼항연산자, map, filter)만 가능 */}
    {/* jsx에서는 변수선언, 함수선언, if, for는 안됨 */}
    {/* class(x) => className(o) */}
    <ul>
      {user.map((v) => (
        <li>
          {v.name} <span className="mx-2">|</span>
          {v.age}
        </li>
      ))}
    </ul>
  </div>
);

ReactDOM.render(el2, app);
