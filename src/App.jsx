import { useState, memo, useMemo } from 'react';

// ===== Задание 1: React.memo =====
const User = memo(function User({ user }) {
  console.log(`Рендер пользователя: ${user.name}`);
  return <li>{user.name}</li>;
});

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Иван' },
    { id: 3, name: 'Мария' },
  ]);
  const [count, setCount] = useState(0);

  const renameFirst = () => {
    setUsers((prev) =>
        prev.map((u) => (u.id === 1 ? { ...u, name: u.name + '!' } : u))
    );
  };

  return (
      <div>
        <button onClick={() => setCount(count + 1)}>Счётчик: {count}</button>
        <button onClick={renameFirst}>Изменить первого</button>
        <ul>
          {users.map((user) => (
              <User key={user.id} user={user} />
          ))}
        </ul>
      </div>
  );
};

// ===== Задание 2: useMemo =====
const ExpensiveCalculation = ({ numbers }) => {
  const result = useMemo(() => {
    console.log('Тяжёлое вычисление...');
    let sum = 0;
    for (let i = 0; i < 100000000; i++) {
      sum += numbers[i % numbers.length];
    }
    return sum;
  }, [numbers]);

  return <p>Результат: {result}</p>;
};

const App = () => {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [theme, setTheme] = useState(false);

  return (
      <div style={{ background: theme ? '#eee' : '#fff' }}>
        <UserList />
        <hr />
        <button onClick={() => setTheme(!theme)}>Сменить фон</button>
        <button onClick={() => setNumbers([...numbers, numbers.length + 1])}>
          Добавить число
        </button>
        <ExpensiveCalculation numbers={numbers} />
      </div>
  );
};

export default App;