# Smart_House

1- Sistemare installazione GIT
2- Completare Area Login: come?
3- Per Preferences implemento un servizio rest su drive dove carico o salvo nuove impostazioni

4- Home e contacts semplici info app. In home come funziona l'app
5- Per l'area tuning devo vedere come funziona l'app C desktop per invio dati. Mi sembra carichi semplici stringhe
6- Comunicazione Nodejs --> C app
	Passo 1: Node salva FS
	Passo 2: Node invia al broker che salva su FS
	Passo 3: C consuma i dati nella coda del broker. Modifica C desktop in modo che all'avvia sia presente anche 
		 l'opzione Auto oltre al carimento dei dati salvati su FS. Auto va in loop e consuma i dati del broker
		 quando arrivano. Va bene se C desktop rimane in loop o deve prevedere un modo per chiudersi.





DOMANDE:
Deploy online o va bene localhost?
Devo lavorare sull'aspetto grafico?
Funzionalità da aggiungere?
Comunicazione triviale tramite FS va bene oppure uso un broker?
