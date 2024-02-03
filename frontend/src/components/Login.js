import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState, useContext } from 'react';
import { authorize } from '../utils/auth';

function Login({ setLoggedIn, setMessage, message }) {
  const { setIsMobileOpen } = useContext(CurrentUserContext);

  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [popOpenFail, setPopOpenFail] = useState(false);
  const [popOpenSuccess, setPopOpenSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await authorize(email, password);
      if (res.token) {
        const response = await fetch('http://localhost:3000/users/me', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${res.token}`,
          },
        });
        const userData = await response.json();
        setMessage(`Bienvenido, ${userData.name}`);
        localStorage.setItem('user', JSON.stringify(userData));
        setMessage('Inicio de sesión exitoso');
        localStorage.setItem('token', res.token);
        setPopOpenSuccess(true);
        setIsMobileOpen(false);
      }
    } catch (err) {
      setPopOpenFail(true);
    }
  }

  useEffect(() => {
    if (popOpenSuccess) {
      setTimeout(() => {
      setPopOpenSuccess(false);
      setFormData({
        email: '',
        password: '',
      });
      setLoggedIn(true);
      history.push('/');
      }, 3000);
    }
  }, [popOpenSuccess, history, setLoggedIn]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleClosePopUp = () => {
    setPopOpenFail(false);
    setPopOpenSuccess(false);
  };

  return (
    <>
      <div className="register__content">
        <form className="register__form" onSubmit={handleSubmit}>
          <h2 className="register__title">Inicia sesión</h2>
          <input
            className="register__input"
            name="email"
            type="email"
            placeholder="Correo Electronico"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="register__input"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="register__button">Inicia sesión</button>
          <p className="register__subtitle">
            ¿Aún no eres miembro? Regístrate <Link to="/users/signup">aquí</Link>
          </p>
        </form>
        <InfoTooltip
          onSuccess={popOpenSuccess}
          onFail={popOpenFail}
          onClose={handleClosePopUp}
          message={message}
        />
      </div>
    </>
  );
}

export default Login;
