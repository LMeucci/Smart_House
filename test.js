// Come debuggare parti di codice
const debugGenerale= require('debug')('server:generale');
const debugRouting= require('debug')('server:routing');

debugGenerale("Messaggio generale");
debugRouting("Messaggio routing");

/*
Disabilitare stampe debug
export DEBUG=

Abilitare debug per un namespace
export DEBUG=server:generale

Abilitare debug per più namespace
export DEBUG=server:*
*/
