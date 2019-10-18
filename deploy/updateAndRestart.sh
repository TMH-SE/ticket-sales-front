pm2 delete TICKET_FRONTEND

pm2 status

cd ticket-sales-front

npm i

echo "--------------Start app--------------------"
pm2 start --name TICKET_FRONTEND npm -- start