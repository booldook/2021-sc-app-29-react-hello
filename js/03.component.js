// Component란 재사용 가능한 코드 조각
// Component는 항상 대문자로 시작한다. 소문자로 시작하면 태그 판정
// React

const app = document.querySelector('#app');

// 1. Class로 만들기
class Hello extends React.Component {
  render() {
    const userName = 'booldook';
    return <h1>Hello {userName}</h1>;
  }
}

// 2. Hooks(함수형)로 만들기
const Hello2 = () => {
  const userName = 'booldook2';
  return <h1>Hello {userName}</h1>;
};

const el = (
  <div>
    <Hello />
    <Hello2 />
  </div>
);

ReactDOM.render(el, app);
