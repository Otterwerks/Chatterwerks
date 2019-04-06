import { connect } from 'react-redux'
import LoginForm from '../components/LoginForm'
import { setUser } from '../actions';

const mapStateToProps = state => ({
    user: state.user,
    queryStatus: state.message.queryStatus
});

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(setUser(user)),
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm))