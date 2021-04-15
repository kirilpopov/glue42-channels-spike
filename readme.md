**How to run**
* npm i
* npm run serve
* copy *spike-channels.json* to _%LocalAppData%\Tick42\GlueDesktop\config\apps_
* launch Glue42 - you should see the apps in a *Channels Spike* folder in the launcher
* start the four apps and set them to some channel (YELLOW)
* start another four and set them to another channel (PURPLE)
* press "Update channel context" in some of the apps on YELLOW
* press "Update channel context" in some of the apps on PURPLE
* save a global layout
* close the apps
* restore the saved global layout
* **expected** - apps to be restored on the channels they were left

**Highlights**
*  _glue.channels.subscribe_  method - subscribes for the current channel - the callback will be invoked if :
    * the data on your current channel has changed - your callback will be invoked with the new data
    * the user has changed the selected channel for your app - you callback will be invoked with the data of your new channel; Note that you don't need to re-subscribe at that point, your callback will start receiving updates for the new channel
    * the user has removed the app from any channel - your callback will be invoked with undefined.
* _glue.channels.publish_ method - publishes data to the current channel
