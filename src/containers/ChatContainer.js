import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { setMessages, setQueryStatus } from '../actions';

const mapStateToProps = state => ({
    user: state.user,
    queryStatus: state.message.queryStatus
});

const mapDispatchToProps = dispatch => ({
    updateMessages: messages => dispatch(setMessages(messages)),
    updateQueryStatus: status => dispatch(setQueryStatus(status))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)