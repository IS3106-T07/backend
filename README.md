Backend Setup
1. Install Node.js from
https://nodejs.org/en/
Download version 8.11.4 LTS (this is the most stable version of Node)
We can change version later if we want

2. Install MongoDB
If you are a Mac user, you can use homebrew to download 
'brew install mongodb'
run 'brew services start mongodb' to start mongodb background service
run 'lsof -i:27017' 
you you should be able to get a response: 
'mongod  3686 Druidccsos   11u  IPv4 0x4e276b77f1650a1f      0t0  TCP localhost:27017 (LISTEN)'

For windows users: 
please follow the guide to download and run mango server
https://www.mongodb.com/

Recommended mongodb visualizer Robo 3T: 
https://robomongo.org/

