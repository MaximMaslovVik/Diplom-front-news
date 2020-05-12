import Actions from './Actions';

const loginPopupActions = dependencies => {
  const {
    form,
    registrationPopup,
  } = dependencies;

  return new Actions({
    openForm: () => form.initForm(),
    closeForm: () => form.close(),
    showRegistrationPopup: () => registrationPopup.setContent(),
  });
};

const registrationPopupActions = dependencies => {
  const {
    form,
    loginPopup,
    successRegistrationPopup,
  } = dependencies;

  return new Actions({
    openForm: () => form.initForm(),
    closeForm: () => form.close(),
    showLoginPopup: () => loginPopup.setContent(),
    showSuccessRegistrationPopup: () => successRegistrationPopup.setContent(),
  });
};

const successRegistrationPopupActions = dependencies => {
  const {
    loginPopup,
  } = dependencies;

  return new Actions({
    showLoginPopup: () => loginPopup.setContent(),
  });
};

export {
  loginPopupActions,
  registrationPopupActions,
  successRegistrationPopupActions,
};
