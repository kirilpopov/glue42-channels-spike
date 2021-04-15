const doWhenGlueReady = (glue) => {
    window.glue = glue;

    glue.channels.subscribe((data) => {
        visualizeChannelsContext(JSON.stringify(data, null, 2));
    });
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


Glue({ channels: true }).then(doWhenGlueReady);
visualizeAppName(glue42gd.application);