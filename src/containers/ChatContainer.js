import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { setMessages, setQueryStatus, setSubscribedUsers, setAvailableThreads } from '../actions';

const mapStateToProps = state => ({
    user: state.user,
    queryStatus: state.message.queryStatus,
    threadName: state.user.currentThread
});

const mapDispatchToProps = dispatch => ({
    updateMessages: messages => dispatch(setMessages(messages)),
    updateQueryStatus: status => dispatch(setQueryStatus(status)),
    updateSubscribedUsers: users => dispatch(setSubscribedUsers(users)),
    updateSubscriptions: threads => dispatch(setAvailableThreads(threads))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)