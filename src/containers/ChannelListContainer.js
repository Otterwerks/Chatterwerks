import { connect } from 'react-redux';
import ChannelList from '../components/ChannelList';
import { switchThread } from '../actions';

const mapStateToProps = state => ({
    threads: state.user.availableThreads,
})

const mapDispatchToProps = dispatch => ({
    setThread: thread => dispatch(switchThread(thread)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChannelList)