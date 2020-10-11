**asdta** - the **a**llow **s**elf-**d**etermined **t**ime **a**llocation daemon
================================================================================

a tool to control how long certain programs may run on a day.
if the time constant for a certain process is exceeded, the process is terminated immediately.
shortly before the time expires a system notification is displayed.

the _asdta_ script should be executed in intervals, e.g. once every 60 seconds.
on startup the configuration is read in and for all contained processes:
- checks if they are running
- if yes, then the time constant for this process is increased (by how much is configurable if the script is executed every 60 seconds, it would make sense to increase the constant by 60 seconds as well)
- when a certain time constant is reached, a system notification is displayed
- if the time constant for the day is exceeded, the process is stopped immediately

after that the script terminates, but before that the current status (time-contingent) is written into a json file. this json file will be read in again at the next program start.


Helpful resources from the internet that were used to develop this script
-------------------------------------------------------------------------

- https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
- https://medium.com/better-programming/schedule-node-js-scripts-on-your-mac-with-launchd-a7fca82fbf02
