# File Systems

CSCS supports different file systems, whose specifications are summarized in the table below:
	
 | [/scratch](scratch) (Piz&nbsp;Daint) | [/scratch](scratch) (Clusters) | [/users](users) | [/project](project) | [/store](store)
 --- | --- | --- | --- | --- | --- 
Type | Lustre | GPFS | GPFS | GPFS | GPFS
Quota |	Soft (1M files) | None | 10GB/user and 100K files | 50K files/TB | Contract
Expiration | 30 days | 30 days | None | End of the project | Contract
Data Backup | None | None | [90 days](../data_backup) | [90 days](../data_backup) | [90 days](../data_backup)
Access Speed | Fast | Fast | Slow  | Medium | Slow
Capacity | 6.2 PB | 1.4 PB | 86 TB | 5.7 PB | 4.4 PB
Prova
