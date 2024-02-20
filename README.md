# Chrome extension for copying jira ticket number and headline
When a ticket is open in the browser click the extension icon to copy the information to the clipboard.

## Settings
It possible to customize some things on the extension, by right clicking the extension and choose options

**Allowed url** is used to define on which pages the extension is allowed to look for info. Something like https://DOMAIN.atlassian.net/browse/

**Command** is used to add a prepended command, most likely "git checkout -b"

**Prefix** is used to add your own prefix to the jira string 

**Suffix** is used to add your own suffix to the jira string


[COMMAND] [PREFIX]-jira_ticket_number-jira_ticket_headline-[SUFFIX]

## Errors
if the extension face an error while trying to get the informationm it will write fail on the extension icon, and the popup text on the icon will show the actual error.
The error will go away after 5s.
