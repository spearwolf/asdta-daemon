**asdta** - the **a**llow **s**elf-**d**etermined **t**ime **a**llocation daemon :thinking:
================================================================================

a tool to control how long specific programs may run on a day. If the time contingent for a particular process is exceeded, the process is terminated immediately. shortly before the time expires, a system notification is displayed.

you should execute the _asdta_ script in intervals — _e.g._ once every 60 seconds. on startup, the configuration is read in, and for all contained processes, the following steps are performed:
- checks if they are running
- if yes, then the time amount for this process is increased (by how much is configurable &mdash; _e.g._ if the script is executed every 60 seconds, it would make sense to increase the amount by 60 seconds as well)
- when a particular time contingent is reached, a system notification is displayed
- if the time contingent for the day is exceeded, the process is stopped immediately

after that the script terminates, but before that the current status (time amount for each process usage by day) is written into a json file. this json file will be read in again at the next program start.

## Setup and Install

### 1. Configuration

The _asdta_ daemon uses the directory `%HOME/.asdta/` as workspace. The main configuration script is `$HOME/.asdta/asdta-cfg.json`.
You need to create your configuration manually &mdash; You can use the `asdta-cfg-example.json` as an example.

```sh
$ mkdir -p $HOME/.asdta/
$ cp asdta-cfg-example.json $HOME/.asdta/asdta-cfg.json
```

Helpful resources from the internet that were used to develop this script
-------------------------------------------------------------------------

- https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e
- https://medium.com/better-programming/schedule-node-js-scripts-on-your-mac-with-launchd-a7fca82fbf02
- https://github.com/mikaelbr/node-notifier
- https://systeminformation.io/
