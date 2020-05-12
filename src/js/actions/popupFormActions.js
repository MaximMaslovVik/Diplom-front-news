import Actions from './Actions';

const loginPopupFormActions = dependencies => {
  const {
    mainApi,
    auth,
    popup,
  } = dependencies;

  return new Actions({
    submit: async (...args) => {
      const [signinData, closeForm, setServerError, setActiveStatus] = args;
      try {
        const loginResponse = await mainApi.signin({ ...signinData });
        if (loginResponse.status === 200) {
          await auth.authenticate();

          closeForm();

          popup.close();
        } else {
          const responseError = await loginResponse.json();
          throw new Error(responseError.message);
        }
      } catch (err) {
        setServerError('Неправильное имя пользователя или пароль');
      } finally {
        setActiveStatus();
      }
    },
  });
};

const registrationPopupFormActions = dependencies => {
  const {
    mainApi,
    popup,
  } = dependencies;

  return new Actions({
    submit: async (...args) => {
      const [signupData, setServerError, setActiveStatus] = args;
      try {
        const registrationResponse = await mainApi.signup({ ...signupData });
        if (registrationResponse.status === 201) {
          popup.loadSuccessPopup();
        } else {
          const responseError = await registrationResponse.json();
          throw new Error(responseError.message);
        }
      } catch (err) {
        setServerError('Пользователь с таким email уже зарегистрирован');
      } finally {
        setActiveStatus();
      }
    },
  });
};

export {
  loginPopupFormActions,
  registrationPopupFormActions,
};
