---
title: "Fetching data from Microsoft Graph using Tasker"
date: 2020-01-27 00:00:00 +0100
categories: android
---

<script>
import Figure from '$lib/components/Figure.svelte';
</script>

This is a description of how to get data from the Microsoft graph to your
Android device's home screen using Tasker and KLWP.

## Requirements

- A Microsoft account -- No account, no data to fetch either. Chances are you
  already have this if you have a live.com/hotmail.com account or XBox account.
  Or you might have a work/school account.
- An Android device
- [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)
  -- The power tool for automating your Android device.
- [KLWP](https://play.google.com/store/apps/details?id=org.kustom.wallpaper) --
  Kustom Live wallpaper. If you'd rather make a widget, KWGT would be the
  equivalent.

## What is Microsoft Graph

Microsoft Graph connects all your data within the Microsoft eco system, such as
emails in Outlook, pages in OneNote, files in OneDrive, etc. These can be
queried through a REST-like API with support for some advanced queries. To test
what data you might find, use the
[Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer).

The Graph Explorer is also a great way to fine tune the queries you will be
using later. It might for instance be a good idea for performance to only fetch
the fields you will be using.

## Setup Azure app id for your Tasker flow

For the authentication flow to work, you need a registered application ID to
authenticate with MSGraph. This can be freely set up in Azure with a free Azure
account. We need this even when using Tasker, as we're technically scripting our
own custom application in Tasker.

### Step 0: Create Azure account

At [the Azure portal](https://portal.azure.com) sign in with your Microsoft
account, or github account.

### Step 1: Create an application

1. Go to the
   [application registration "blade"](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade).
2. Tap "New registration".
   1. In the registration page enter the required data:
   2. Enter a name for your "app". Anything goes, this is for your information
      only.
   3. Select "Accounts in any organizational directory (Any Azure AD directory -
      Multitenant) and personal Microsoft accounts (e.g. Skype, Xbox)"
   4. Add Tasker's OAuth response endpoint as the Redirect URL. (Type Web)
      `https://tasker.joaoapps.com/auth.html`
   5. Click "Register"

### Step 2: Get application ID and a secret key

The application ID is displayed on the App registration page after the
application is registered. Take a copy of this.

To generate the secret, go to "Certificates and secrets".

1. Click "New client secret"
2. Give your secret a name, set expiry time and create.
3. Copy your newly generated secret. **You will not be able to copy it later.**

### Step 3: Grant permissions

By now you have all you need to connect your "app", but it will not be allowed
to access anything. For that we need to grant it the right permissions.

<Figure file="/images/tasker/permissions1.png" caption="API permissions overview" />

1. Go to "API permissions"
2. Click "Add a permission"
3. Select Microsoft Graph API
4. Use "Delegated permissions"
5. Select permissions you expect to need. For OneDrive, you'll need
   `Files.Read`, Outlook mail will require `Mail.Read`.
6. Click "Add permissions"

Word of warning: It's a good idea to not grant more permissions than you expect
to use. In particular, don't give your app write permissions unless you're
making some serious Tasker tasks that will be writing things back.

## Create Tasker task to fetch data

With the paperwork done, we can move on to the fun stuff.

Open Tasker and go to the Tasks tab, then tap the + circle down on the corner to
create a new Task. Give it a name.

### Authentication

As the first step of the task, add an `HTTP Auth` action. On the action page,
select

1. _Method_: OAuth 2.0
2. _Client ID_: The ID you got when you registered your app on Azure
3. _Client Secret_: The secret you generated on Azure
4. _Endpoint to get code_:
   `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`
5. _Endpoint to get refresh token_:
   `https://login.microsoftonline.com/common/oauth2/v2.0/token`
6. _Scopes_: Add the scopes you need here. Same naming as used in the
   permissions set earlier. For this sample we need at least the `User.Read`
   scope. **For re-authentication to work, we also need to add `offline_access`
   here.**
7. _Force reauthentication_: Should be off, enable if you have auth issues. This
   will cause the login prompt on every execution of your task.

### Fetch sample data from MSGraph

To test the app authentication, download the basic profile information from
`/me`. Display using a basic text popup.

Add an action of type `Net`->`HTTP Request`. In the action page, enter

1. _Method_: GET
2. _URL_: `https://graph.microsoft.com/v1.0/me/`
3. _Headers_: `%http_auth_headers`

Then add an action of type `Alert`->`Popup` and enter

1. _Text_: `%http_data`

Now run your task. It should ask for login, and after that perform the request
and show the result in a popup.

## Bridge to KLWP

There are two options for passing the data to KLWP, pass the entire file (by
reference), or parse it in Tasker and pass each piece of information directly.

### Pass the JSON file

To pass the retrieved JSON to KLWP and let KLWP do the parsing of data, store
the fetched data in files and pass the file location. To do this, set the
`File/Directory to save with output` parameter in the `HTTP Request` task, then
pass the filename to KLWP in a single variable.

<Figure file="/images/tasker/klwpvar.jpg" caption="KLWP file variable" />

The file can then be accessed in KLWP using the `wg()` function.

```kustom
wg(br(tasker, graphme), json, .displayName)
```

A caveat here might be that KLWP seems to be somewhat slow on parsing JSON, so
frequent updates might slow things down. For more complex data such as
Inbox/Files, you will need to invoke the `wg()` for every piece of information
needed.

### Pass single information pieces

JSON may be parsed directly in Tasker using Javascriptlets or Javascript tasks.
These may parse the data as you would in any JS application. A benefit here is
that parsing can be left in Tasker, and KLWP can focus on displaying the result.

To parse the data in Tasker, make sure the `HTTP Request` does not write to
file, then add a `Code`->`Javascript` or `Javascriptlet` task. Your script needs
to parse the `http_data` global variable like this:

```js
setLocal("myDisplayName", JSON.parse(http_data).displayName);
```

Then pass the variable exported using `setLocal` to KLWP.

One downside that I've noticed is the fact that javascript execution in tasker
dismisses popups and keyboard if active on the screen when the task is run. This
is very annoying if your task is on a timer, or responding to user events such
as screen unlock.

Another issue is the quickly escalating number of variables needed to pass to
KLWP.

## Optimization tips

- Graph queries may be refined to only include the actual data you need. Use the
  `$select` query parameter for this. This will save on both bytes downloaded
  and JSON parsing time. See the
  [Microsoft graph documentation](https://docs.microsoft.com/en-us/graph/query-parameters#select-parameter)
  for details.

## Issues

- This may work for your work or school account as well, but that depends on the
  security settings configured. Chances are high that your administrator has
  blocked access from unauthorized applications.

## Update 2020-02-21: offline_access

Apparently, in order to get a `refresh_token` with the auth request, you need to
add the scope `offline_access` to the list of scopes. Updated the steps above to
include that.
