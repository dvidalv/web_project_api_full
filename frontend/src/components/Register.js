import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Error from './Error';
import InfoTooltip from './InfoTooltip';
import { register } from '../utils/auth';

function Register({ setMessage, message }) {
  const history = useHistory();
  const [popOpenSuccess, setPopOpenSuccess] = useState(false);
  const [popOpenFail, setPopOpenFail] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: 'Jacques Cousteau',
    about: 'Explorador',
    avatar: 'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  });

  useEffect(() => {
    if (popOpenSuccess) {
      setTimeout(() => {
        setPopOpenSuccess(false);
        setFormData({
          name: '',
          about: '',
          avatar: '',
          email: '',
          password: '',

        });

        history.push('/signin');
      }, 3000);
    }
  }, [popOpenSuccess, history]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, about, avatar, email, password, confirmPassword } = formData;
    if (password === confirmPassword) {

      register(name, about, avatar, email, password)
        .then((res) => {
          if (res.user.email) {
            setMessage('Registro exitoso');
            setPopOpenSuccess(true);
            setError('');
          }
          if (res.err) {
            setMessage('El correo ya existe');
            setPopOpenFail(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setMessage('Error al Registrar');
          setPopOpenFail(true);
        });
      setError('');
    } else {
      setError('Las contraseñas no coinciden');
    }
  }

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
          <h2 className="register__title">Regístrate</h2>

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
            minLength="6"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="register__input"
            name="confirmPassword"
            minLength="6"
            type="password"
            placeholder="Repite la contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <input
            className="register__input"
            name="name"
            type="text"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}

          />
          <input
            className="register__input"
            name="about"
            type="text"
            placeholder="About"
            value={formData.about}
            onChange={handleChange}

          />
          <input
            className="register__input"
            name="avatar"
            type="url"
            placeholder="Avatar"
            value={formData.avatar}
            onChange={handleChange}

          />
          {error ? <Error error={error} /> : null}
          <button className="register__button">Regístrate</button>
          <p className="register__subtitle">
            ¿Ya eres miembro? Inicia sesión {<Link to={'/signin'}>aquí</Link>}
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

export default Register;
