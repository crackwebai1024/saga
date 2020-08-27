import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as notificationActions } from 'redux/notification';

class Notifier extends React.Component {
  displayed = [];

  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      message: PropTypes.string.isRequired,
      options: PropTypes.shape({
        variant: PropTypes.string.isRequired,
      }).isRequired,
      key: PropTypes.number.isRequired,
    })).isRequired,
    actions: PropTypes.shape({
      removeNotification: PropTypes.func.isRequired,
    }).isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
  }

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;

    for (let i = 0; i < newSnacks.length; i += 1) {
      if (!notExists) {
        notExists = notExists || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
      }
    }

    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [], actions, enqueueSnackbar } = this.props;

    notifications.forEach((notification) => {
      if (this.displayed.includes(notification.key)) {
        return;
      }

      enqueueSnackbar(notification.message, notification.options);
      this.storeDisplayed(notification.key);
      actions.removeNotification(notification.key);
    });
  }

  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id];
  };

  render() {
    return null;
  }
}

const mapStateToProps = ({
  notification: {
    nextNotification,
    notifications,
  },
}) => ({
  nextNotification,
  notifications,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...notificationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Notifier));
