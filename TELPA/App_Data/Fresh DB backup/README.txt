Kaip teisingai atlikti pakeitimus Entities klasėse kad teisingai susigeneruotų DB lentelės ir veiktų loginai:

1. Ištriname failus:
	TELPA\TELPA\App_Data\TELPA_DB.mdf
	TELPA\TELPA\App_Data\TELPA_DB_log.ldf
	
Jei neleidžia trinti:
  uždaryti Visual Studio ir aplikacijas, kurios naudoja SQL serverį (pvz SQL studio);
  task managery nukillint SQL Server procesą, jei vis dar toks yra.

	
2. Nukopijuojame failus iš TELPA\TELPA\App_Data\Fresh DB backup\DB Files
	į TELPA\TELPA\App_Data folderį
	
	
3. Paleidžiame projektą, kad sugeneruotų entities lenteles (įvyktų koks nors db insertas) - loginai kol kas neveiks.


4. Stabdome run, einame Server Explorer - TELPA_DB - ištriname lentelę __MigrationHistory.
(arba new query - drop table __MigrationHistory;)


5. Vėl paleidžiame projektą, dabar loginai turėtų veikti tinkamai.
Patikrinimui default user:
	username - admin
	password - Admin123.