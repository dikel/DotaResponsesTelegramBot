# Dota Responses Telegram Bot

Telegram bot that replies with Dota hero responses to messages.

If you want to use it in a group chat you need to give the bot admin rights.

Currently it fetches all responses that start with the message text and returns a random one.

## TODO

- Return only responses with exact text by default
- Add support for responses that start with the message text by using "...". For example the message "From the Ghastly..." should return the Skywrath Mage's response
- Add support for returning responses from a specific hero. For example the message "(Sniper) Ho ho ha ha" should always return Sniper's laugh
- Improve the database: remove some announcers, add new heroes and Io/Phoenix/Marci responses

## Building

### Generate db File

The `bot.db` file can be generated by cloning [`DotaResponsesRedditBot`](https://github.com/Jonarzz/DotaResponsesRedditBot) and running `setup.py`

Alternatively you can download the `bot.db` file from IPFS. [CID: `bafybeidahp6cgkwcsfg5j3mpz627heksdwtyilheaglrop4qqcslwz2u6q`](ipfs://bafybeidahp6cgkwcsfg5j3mpz627heksdwtyilheaglrop4qqcslwz2u6q/)

### Build Docker Image

1. `sudo docker build -t <username>/dota-responses-telegram-bot .`
2. `sudo docker run -e TOKEN="<YOUR_BOT_TOKEN>" --name telegram-bot -d <username>/dota-responses-telegram-bot`
3. `docker push <username>/dota-responses-telegram-bot`