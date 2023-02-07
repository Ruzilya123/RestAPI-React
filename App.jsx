// Task 1

// import React from "react";
// import { useState } from "react";

// function Info() {
//   return <h2>Погода</h2>;
// }

// const Form = ({weatherMethod}) => {
//   return (
//     <form onSubmit={weatherMethod}>
//       <input type="text" name="city" placeholder="город" />
//       <button type="submit">Получить погоду</button>
//     </form>
//   );
// };

// const Weather = ({ temp, city, country, sunrise, sunset, error }) => {
//   return (
//     <div className="weather">
//         {temp &&
//           <div className="weather__info">
//             <div className="weather__info__city">
//               <h1>
//                 Город {city}, Страна {country}
//               </h1>
//             </div>
//             <div className="weather__info__temp">
//               <h2>Температура: {temp}°C</h2>
//             </div>
//             <div className="weather__info__sunrise">
//               <h2>Рассвет: {sunrise}</h2>
//             </div>
//             <div className="weather__info__sunset">
//               <h2>Закат: {sunset}</h2>
//             </div>
//           </div>
//         }
//       <div className="error">
//         <h1>{error}</h1>
//       </div>
//     </div>
//   );
// };

// const API_KEY = "679d1bca15a2c3cc85a58205f6868bee";

// function App() {

//   const [temp, setTemp] = useState(undefined);
//   const [city, setCity] = useState("");
//   const [country, setCountry] = useState(undefined);
//   const [sunrise, setSunrise] = useState(undefined);
//   const [sunset, setSunset] = useState(undefined);
//   const [error, setError] = useState(undefined);

//   const gettingWeather = async (event) => {
//     event.preventDefault();
//     const city = event.target.elements.city.value;
//     if (city) {
//       const api_url = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//       );
//       const data = await api_url.json();
//       console.log(data);
//       setTemp(data.main.temp);
//       setCity(data.name);
//       setCountry(data.sys.country);
//       setSunrise(changeSun(data.sys.sunrise));
//       setSunset(changeSun(data.sys.sunset));
//       setError(undefined);
//     } else {
//       setTemp(undefined);
//       setCity(undefined);
//       setCountry(undefined);
//       setSunrise(undefined);
//       setSunset(undefined);
//       setError("Введите город");
//     }
//   };

//   function changeSun(sun) {
//     const date = new Date();
//     date.setTime(sun);
//     const sun_date =
//       date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//     return sun_date;
//   }

//   return (
//     <div className="App" style={{}}>
//       <Info />
//       <Form weatherMethod={gettingWeather} />
//       <Weather
//         temp={temp}
//         city={city}
//         country={country}
//         sunrise={sunrise}
//         sunset={sunset}
//         error={error}
//       />
//     </div>
//   );
// }

// export default App;

// Task 2

import {
  Link,
  Navigate,
  useNavigate,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import { useState, useEffect } from "react";

function Menu({ user, setUser }) {
  function logout() {
    setUser(null);
  }

  return (
    <div>
      {user ? (
        <div>
          <button onClick={logout}>Выйти</button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>Вход</Link>|
          <Link to={"/registration"}>Регистрация</Link>
        </div>
      )}
    </div>
  );
}

function Login({ users, setUser, user, setCart }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (email === "") {
      alert("Неправильный логин или пароль");
      return;
    }
    if (password === "") {
      alert("Неправильный логин или пароль");
      return;
    }
    if (!email.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      alert("Неправильная почта");
      return;
    }

    const user = users.find(
      (user) => user.name === email && user.password === password
    );
    if (user) {
      setUser(user);
      setCart(user.cart);
    } else {
      alert("Пользователь не найден");
    }
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Почта"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

function Registration({ users, setUsers, user }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function registration(event) {
    if (name === "") {
      alert("Неверно введено имя");
      return;
    }
    if (password === "") {
      alert("Неверно введен пароль");
      return;
    }
    if (!name.match(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)) {
      alert("Неверная почта");
      return;
    }

    const user = users.find((user) => user.name === name);
    if (user) {
      alert("Такой пользователь уже существует");
    } else {
      const newUser = {
        id: users.length + 1,
        name,
        password,
        cart: [],
        orders: [],
      };
      setUsers([...users, newUser]);
      navigate("/login");
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <Navigate to={"/"} />
        </div>
      ) : (
        <div>
          <h1>Registration</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Почта"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button onClick={registration}>Register</button>
        </div>
      )}
    </div>
  );
}

function Home({ products, cart, setCart, user }) {
  function isProductInCart(product) {
    return cart.some((cartProduct) => cartProduct.id === product.id);
  }

  function addProductToCart(product, event) {
    event.target.parentNode.classList.add("hide");
    event.target.parentNode.classList.add("hide_animation");
    product = {
      ...product,
      quantity: 1,
    };
    setCart([...cart, product]);
  }

  const productsList = products.map((product) => {
    return (
      <li key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.strDrinkThumb} style={{ width: "100px" }} />
        {user ? (
          !isProductInCart(product) ? (
            <button onClick={(event) => addProductToCart(product, event)}>
              Добавить в корзину
            </button>
          ) : (
            <button disabled>Добавлено в корзину</button>
          )
        ) : (
          <button disabled>Войдите чтобы добавить товар в корзину</button>
        )}
      </li>
    );
  });

  return (
    <main>
      <h1>Товары</h1>
      <ul>{productsList}</ul>
    </main>
  );
}

function Cart({ cart, setCart, user }) {
  const navigate = useNavigate();

  const removeProductFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const updateProductQuantity = (product, quantity) => {
    const newCart = cart.map((item) => {
      if (item.id === product.id) {
        if (item.quantity + quantity === 0) {
          return null;
        }
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      return item;
    });
    setCart(newCart.filter((item) => item !== null));
  };

  const cartList = cart.map((product) => {
    return (
      <li key={product.id}>
        <h2>{product.name}</h2>
        <img src={product.strDrinkThumb} style={{ width: "100px" }} />
        <p>Цена: {product.quantity}</p>
        <button onClick={() => removeProductFromCart(product)}>
          Удалить из корзины
        </button>
        <button onClick={() => updateProductQuantity(product, 1)}>+</button>
        <button onClick={() => updateProductQuantity(product, -1)}>
          -
        </button>
      </li>
    );
  });

  if (user === null) {
    return (
      <main>
        <h1>Корзина</h1>
        <p>Войдите чтобы открыть корзину</p>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main>
        <h1>Корзина</h1>
        <p>Ваша корзина пуста</p>
      </main>
    );
  }

  const goHome = () => {
    navigate("/");
  };

  return (
    <main>
      <button onClick={goHome}>Вернуться</button>
      <h1>Корзина</h1>
      <ul>{cartList}</ul>
    </main>
  );
}

function Links(props) {
  return (
    <nav className={"navbar"}>
      <ul>
        <li>
          <Link to="/">Главная</Link>
        </li>
        {props.user ? (
          <>
            <li>
              <Link to="/cart">Корзина</Link>
            </li>
          </>
        ) : null}
        <li>
          <Menu {...props} />
        </li>
      </ul>
      <hr />
    </nav>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);

  const gettingDrink = async () => {
    const url =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    gettingDrink().then((data) => {
      data.drinks.forEach((item) => {
        item.id = item.idDrink;
        delete item.idDrink;
      });
      data.drinks.forEach((item) => {
        item.name = item.strDrink;
        delete item.strDrink;
      });
      setProducts(data.drinks);
    });
  }, []);

  function saveUser(user) {
    const newUsers = users.map((u) => {
      if (u.id === user.id) {
        u.cart = cart;
      }
      return u;
    });
    setUsers(newUsers);
  }

  useEffect(() => {
    if (user) {
      saveUser(user);
    }
  }, [cart]);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BrowserRouter>
        <Links
          cart={cart}
          setCart={setCart}
          users={users}
          setUsers={setUsers}
          user={user}
          setUser={setUser}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                cart={cart}
                setCart={setCart}
                user={user}
                saveUser={saveUser}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                user={user}
                saveUser={saveUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                users={users}
                setUsers={setUsers}
                user={user}
                setUser={setUser}
                setCart={setCart}
              />
            }
          />
          <Route
            path="/registration"
            element={
              <Registration
                users={users}
                setUsers={setUsers}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
