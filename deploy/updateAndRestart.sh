sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000

pm2 delete TICKET_FRONTEND

pm2 status

cd ticket-sales-front

npm i

echo "--------------Start app--------------------"
pm2 start --name TICKET_FRONTEND npm -- start