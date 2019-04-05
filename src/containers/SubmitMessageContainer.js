import { connect } from 'react-redux'
import SubmitMessage from '../components/SubmitMessage'
import { setSubmissionStatus } from '../actions'

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    updateSubmissionStatus: status => dispatch(setSubmissionStatus(status))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubmitMessage)