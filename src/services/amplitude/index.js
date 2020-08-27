class AmplitudeService {
  init = () => {
    window.amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_KEY);
  }

  logEvent = (eventType, eventProperties) => {
    const props = eventProperties
      ? { ...eventProperties, domain: this.domain }
      : { domain: this.domain };

    window.amplitude.getInstance().logEvent(eventType, props);
  }

  setUser = (user) => {
    const amplitude = window.amplitude.getInstance();

    if (user && Object.keys(user).length) {
      const userProps = {
        'User email': user.email,
      };
      amplitude.setUserId(user.id);
      amplitude.setUserProperties(userProps);
    } else {
      amplitude.setUserId(null);
      amplitude.setUserProperties(null);
    }
  }
}

export default new AmplitudeService();
