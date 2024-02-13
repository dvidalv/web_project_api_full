import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { checkToken } from '../utils/auth';
import { AnimatePresence } from 'framer-motion';

function App() {
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [token, setToken] = useState('');
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  // Obtener las tarjetas
  const fetchCards = useCallback(
    async (token) => {
      try {
        const cards = await api.getInitialCards(token);
        setCards(cards);
      } catch (err) {
        // console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  // Verificar el token
  useEffect(() => {
    // setIsLoading(true);
    setIsVerifyingToken(true); // Inicia la verificación del token
    const tokenCheck = async () => {
      let shouldRedirectToHome = false;
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const tokenIsValid = await checkToken(token);
          if (tokenIsValid) {
            const { user } = tokenIsValid;
            setLoggedIn(true);
            shouldRedirectToHome = true;
            setCurrentUser(user);
            fetchCards(token);
          } else {
            setLoggedIn(false);
          }
        } catch (error) {
          console.error(error);
          setLoggedIn(false);
        } finally {
          setIsLoading(false);
          setIsVerifyingToken(false); // Finaliza la verificación del token
          if (shouldRedirectToHome) {
            history.push('/');
          } else {
            history.push('/signin');
          }
        }
      } else {
        setLoggedIn(false);
        setIsLoading(false);
        setIsVerifyingToken(false); // Finaliza la verificación del token
        history.push('/signin');
      }
    };
    tokenCheck();
  }, [history, fetchCards, setLoggedIn, setCurrentUser, setToken]);

  // Cerrar sesión
  const cerrarSesion = () => {
    if (!isVerifyingToken) {
      // Solo permite cerrar sesión si no se está verificando el token
      localStorage.removeItem('token');
      setLoggedIn(false);
      setCurrentUser({});
      setIsMobileOpen(false);
      history.push('/signin');
    }
  };

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i === currentUser._id);
    console.log(isLiked);

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked, token);
      console.log(newCard);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard('cards', card._id, token);

      setCards((cards) => cards.filter((c) => c._id !== card._id));
    } catch (err) {
      console.log(err);
    }
    closeAllPopups();
  };

  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setIsDeletePopupOpen(true);
  };

  const handleCardClick = (card) => {
    document.body.style.overflow = 'hidden';
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const closeAllPopups = () => {
    document.body.style.overflow = 'auto';
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await api.patchUserInfo(userData, token);
      setCurrentUser(updatedUser.user);
    } catch (error) {
      console.log(error);
    }
    closeAllPopups();
  };

  // Function to handle the avatar update
  const handleUpdateAvatar = async (avatar) => {
    try {
      const updateAvatar = await api.setUserAvatar(avatar, token);
      // console.log(updateAvatar);

      setCurrentUser(updateAvatar.user);
    } catch (error) {
      console.log(error);
    }
    closeAllPopups();
  };

  // Function to handle the submission of a new place
  const handleAddPlaceSubmit = async (card) => {
    try {
      // Call the API to add the new card
      const newCard = await api.addCard(card, token);
      // Update the state of cards by adding the new card to the existing list
      setCards([newCard, ...cards]);
    } catch (error) {
      // Log any error that occurs during the process
      console.log(error);
    }
    // Close all popups after the card has been added
    closeAllPopups();
  };

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          cardToDelete,
          loggedIn,
          isMobileOpen,
          setIsMobileOpen,
          setToken,
        }}
      >
        <Header onCerrarSession={cerrarSesion} />
        <Switch>
          <Route path="/signup">
            <Register message={message} setMessage={setMessage} />
          </Route>
          <Route path="/signin">
            <Login
              setLoggedIn={setLoggedIn}
              message={message}
              setMessage={setMessage}
              onClose={closeAllPopups}
            />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/"
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            onDeleteClick={handleDeleteClick}
            isDeletePopupOpen={isDeletePopupOpen}
            onEditPerfil={handleProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            selectedCard={selectedCard}
            closePopupImage={closeAllPopups}
          />
        </Switch>
        <Footer />
        <AnimatePresence>
          {isEditProfilePopupOpen && (
            <EditProfilePopup
              key="editProfilePopup" // This is necessary to make the component re-mount every time it opens
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {isEditAvatarPopupOpen && (
            <EditAvatarPopup
              key="editAvatarPopup"
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
          )}
          {isAddPlacePopupOpen && (
            <AddPlacePopup
              key="addPlacePopup"
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
          )}
          {isDeletePopupOpen && (
            <DeletePopup
              key="deletePopup"
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
            />
          )}
        </AnimatePresence>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
