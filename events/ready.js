module.exports = async (client) => {
    client.on('ready', async () => {
        client.user.setPresence({
            activities: [
                {
                    name: `Seedhe Maut`,
                    type: `LISTENING`
                }
            ],
            status: `active`
        })
        client.logger.log(`Logged in to ${client.user.tag}`, 'ready')
    })

}
