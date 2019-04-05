import { connect } from 'react-redux'
import Chat from '../components/Chat'
import { setMessages } from '../actions';

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    updateMessages: messages => dispatch(setMessages(messages))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat)