import { PureComponent } from 'react';
import PropTypes from 'prop-types';

const MOBILE_VIEW_WIDTH_BREAKPOINT = 1024;
const MOBILE_SMALL_WIDTH_BREAKPOINT = 600;

class MobileHandler extends PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  state = {
    isMobileView: true,
    smallView: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWidth);
  }

  checkWidth = () => {
    const { isMobileView, smallView } = this.state;

    if (window.innerWidth <= MOBILE_VIEW_WIDTH_BREAKPOINT && !isMobileView) {
      this.setState({ isMobileView: true });
      return null;
    }

    if (window.innerWidth <= MOBILE_SMALL_WIDTH_BREAKPOINT && !smallView) {
      this.setState({ smallView: true });
      return null;
    }

    if (window.innerWidth > MOBILE_SMALL_WIDTH_BREAKPOINT && smallView) {
      this.setState({ smallView: false });
      return null;
    }

    if (window.innerWidth > MOBILE_VIEW_WIDTH_BREAKPOINT && isMobileView) {
      this.setState({ isMobileView: false, smallView: false });
    }

    return null;
  }

  render() {
    const { isMobileView, smallView } = this.state;

    return (
      this.props.children(isMobileView, smallView)
    );
  }
}

export default MobileHandler;
