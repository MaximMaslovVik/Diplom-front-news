import Actions from './Actions';

const headerActions = dependencies => {
  const {
    loginPopup,
    auth,
  } = dependencies;

  return new Actions({
    configActionButton: (...args) => {
      const [isLoggedIn, userName, setHandlers, actionButtonSelector] = args;
      let clickEvent;
      if (!isLoggedIn && loginPopup) {
        clickEvent = loginPopup.open;
      } else if (isLoggedIn && auth) {
        clickEvent = auth.logout;
        document.querySelector(actionButtonSelector).textContent = userName;
      }

      if (clickEvent) {
        setHandlers(clickEvent);
      }
    },
  });
};

export default headerActions;
