const doWhenGlueReady = async (glue) => {
    window.glue = glue;

    const myApp = glue.config.application;
    setAppToOpen(myApp);

    //aby: adding code to save additional data when saving layout
    glue.layouts.onSaveRequested((requestInfo) => {
        // Determine the layout type.
        const layoutType = requestInfo.layoutType;

        // store context only if global layouts
        if (layoutType === "Global") {
            return { windowContext: { myname: glue42gd.application, channelId: glue.channels.my(), layoutName: cbData.layoutName }, activityContext: {} }
        }
    });

    //aby: let us read in the data that was saved while saving the layout
    const myWin = glue.windows.my();
    myWin.getContext().then((windowCtx) => {
        document.getElementById("layout-context").innerHTML = JSON.stringify(windowCtx);
    });

    // subscribe for channel changes
    glue.channels.subscribe((data, a) => {
        visualizeChannelsContext(JSON.stringify(data, null, 2));
    });

    // if not started on some channel, join a random channel
    const onChannel = glue.channels.current() !== undefined;
    if (!onChannel) {
        joinRandomChannel(glue);
    }
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

const setAppToOpen = (myApp) => {
    if (myApp === "orders") {
        appToOpenFromCurrent = "orders-history";
    } else if (myApp === "positions") {
        appToOpenFromCurrent = "order-ticket";
    }
    if (!appToOpenFromCurrent) {
        document.getElementById("openAppButton").setAttribute("disabled", "");
    }
}

const openApp = () => {
    glue.appManager.application(appToOpenFromCurrent).start({}, { channelId: glue.channels.current() });
}

const joinRandomChannel = async (glue) => {
    // get a list of all running windows that are on some channel
    let windowsWithChannels = await glue.channels.getWindowsWithChannels();
    // get all available channels
    const allChannels = await glue.channels.all();
    // find all free channels 
    let freeChannels = allChannels.filter((c) => {
        // if the channel is already on some window - it's not free
        return !windowsWithChannels.find((i) => i.channel === c);
    });
    // if no free , use all
    if (freeChannels.length === 0){
        freeChannels = allChannels;
    }

    //join random channel from the free channels
    channel = freeChannels[Math.floor(Math.random() * freeChannels.length)];
    glue.channels.join(channel);
}

let appToOpenFromCurrent;
Glue({ channels: true }).then(doWhenGlueReady);
visualizeAppName(glue42gd.application);