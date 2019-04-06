import { connect } from 'react-redux'
import RegisterForm from '../components/RegisterForm'
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
)(RegisterForm))