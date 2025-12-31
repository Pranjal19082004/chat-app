DEVELOPER NOTES :(that means it is my notes .... hands off .... start reading from Reader Notes to understand the code base(provided if in future i have written any XD ))

single chat MESSAGE it will give ack back
group message GROUP_MESSAGE it will not

websockets api:--
update a message : UPDATE_MESSAGE
delete a message : DELETE_MESSAGE
typing (may be) : TYPING_MESSAGE
readack : ACK_MESSAGE

join a group : JOIN_GROUP
leave a grp : LEAVE_GROUP

rest api :
fetch chat history
fetch user info
sign-in
sign-out
contact related

so we need to make a service that send a message over to group of socket we given it to (done)

now we will need to make a service to send message to individual guy using user id 
