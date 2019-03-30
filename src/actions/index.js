let userId = 0;
let currentUser = 'Sam';
let current_thread = 1;

export const submitMessage = text => ({
  type: 'SUBMIT_MESSAGE',
  user_name: currentUser,
  text: text, 
  thread_id: current_thread
})

