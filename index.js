const doWhenGlueReady = async (glue) => {
    window.glue = glue;

    glue.channels.subscribe((data, a, b) => {
        console.log(data, a, b)
        visualizeChannelsContext(JSON.stringify(data, null, 2));
    });

    // instead of doing setTimeouts, we should get glue.channels.my() promise version
    // to ask for the current channel
    setTimeout(async () => {
        const onChannel = glue.channels.current() !== undefined;
        console.log(`current is`, glue.channels.current());
        if (!onChannel) {
            //join random channel if not
            let channel = glue.windows.my().context.channel;
            if (!channel) {
                const allChannels = await glue.channels.all();
                channel = allChannels[Math.floor(Math.random() * allChannels.length)];
            }
            glue.channels.join(channel);
        }
    }, 100);

}

const visualizeAppName = (appName) => {
    document.getElementById("app-title").innerHTML = appName;
}

const visualizeChannelsContext = (data) => {
    document.getElementById("context").innerHTML = data;
}

const updateChannel = () => {
    // publish an update with that will add/update an extra property to the channels context 
    // the name of that property will be the current application name and the value will be a  random number
    const update = {};
    update[glue42gd.application] = Math.random() * 100;
    glue.channels.publish(update);
}

const openApp = () => {
    // order random app on the same channel
    const apps = ["orders", "orders-history", "positions", "order-ticket"];
    const appToOpen = apps[Math.floor(Math.random() * apps.length)];
    glue.appManager.application(appToOpen).start({ channel: glue.channels.current() });
}

Glue({ channels: true }).then(doWhenGlueReady);
visualizeAppName(glue42gd.application);