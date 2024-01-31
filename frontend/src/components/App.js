import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
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
  const [userData, setUserData] = useState({});
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Verificar el token
  useEffect(() => {
    const tokenCheck = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        console.log(token)
        try {
          // setIsLoading(false);
          const tokenIsValid = await checkToken(token);
          if (tokenIsValid) {
            setUserData(tokenIsValid);
            setIsLoading(false);
            setLoggedIn(true);
            fetchCards();
            history.push('/');
          } else {
            setLoggedIn(false);
            history.push('/signin');
          }
        } catch (error) {
          setLoggedIn(false);
          history.push('/signin');
        }
      } else {
        setLoggedIn(false);
        setIsLoading(false);
        history.push('/signin');
      }
    };
    tokenCheck();
  }, [loggedIn, history]);

  // Obtener las tarjetas
  const fetchCards = async () => {
    try {
      const cards = await api.getInitialCards('cards');
      setCards(cards);
    } catch (err) {
      console.log(err);
    }
  };

  // get user info
  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     try {
  //       const userData = await api.getUserInfo('users/me');
  //       setCurrentUser(userData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserInfo();
  // }, []);

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserData({});
    setIsMobileOpen(false);
    history.push('/signin');
  };

  async function handleCardLike(card) {
    // Verifica una vez más si a esta tarjeta ya le han dado like
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.log(error);
    }
  }

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard('cards', card._id);
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
      const updatedUser = await api.patchUserInfo(userData);
      setCurrentUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
    closeAllPopups();
  };

  const handleUpdateAvatar = async (avatar) => {
    try {
      const updateAvatar = await api.setUserAvatar(avatar);
      setCurrentUser(updateAvatar);
    } catch (error) {
      console.log(error);
    }
    closeAllPopups();
  };

  // Function to handle the submission of a new place
  const handleAddPlaceSubmit = async (card) => {
    try {
      // Call the API to add the new card
      const newCard = await api.addCard(card);
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
          userData,
          isMobileOpen,
          setIsMobileOpen,
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
              key="editProfilePopup"
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
