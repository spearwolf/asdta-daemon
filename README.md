asdta - the allow self-determined time allocation daemon
========================================================

ein tool, mit dem man steuern kann, wie lange an einem tag bestimmte programme laufen dürfen.
wird das zeitkontigent für ein bestimmten prozeß überschritten, wird dieser sofort terminiert.
kurz vor ablauf der zeit wird eine system benachrichtigung eingeblendet.

das asdta script sollte in intervallen, zB jeweils alle 60 sekunden einmal ausgeführt werden.
beim start wird die configuration eingelesen and für alle darin enthaltenen prozesse:
- überprüft ob sie laufen
- wenn ja, dann wird das zeitkontigent für diesen prozess erhöht (um wieviel ist konfigurierbar, wenn
  das script alle 60 sekunden ausgeführt wird, wäre es sinnvoll, das kontigent ebenfalls um 60 sekunden zu erhöhen)
- wenn ein bestimmtes zeitkontigent erreicht wurde, wird eine system benachrichtigung angezeigt
- wenn das zeitkontigent für den tag überschritten ist, wird der prozess sofort gestoppt

danach beendet sich das script, vorher wird aber noch der aktuelle status (zeitkontigente)
in eine json datei gespeichert. diese json datei wird beim nächsten programmstart wieder eingelesen.
