let userId = 0;
let messageId = Date.now() + userId;
let currentUser = 'Sam';

export const submitMessage = text => ({
  type: 'SUBMIT_MESSAGE',
  id: messageId,
  author: currentUser,
  text: text
})

