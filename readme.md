**How to run**
* npm i
* copy *spike-channels.json* to %LocalAppData%\Tick42\GlueDesktop\config\apps 
* launch Glue42 - you should see the apps in a *Channels Spike* folder in the launcher

**Highlights:**
*  glue.channels.subscribe - subscribes you for the current channel - the callback will be invoked if :
    * the data on your current channel has changed - your callback will be invoked with the new data
    * the user has changed the selected channel for your app - you callback will be invoked with the data of your new channel; Not that you don't need to re-subscribe at that point, your callback will start receiving updates for the new channel
    * the user has removed the app from any channel - your callback will be invoked with undefined.
* glue.channels.publish - publishes data to the current channel
