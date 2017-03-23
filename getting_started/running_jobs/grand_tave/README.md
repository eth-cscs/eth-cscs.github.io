# Grand Tavé

Grand Tavé uses SLURM for the submission, monitoring and control of parallel jobs. 
Parallel programs must be run using the command __srun__. SLURM batch scripts need to be submitted with the sbatch command 
from the `$SCRATCH` folder, since users are NOT supposed to run jobs from different filesystems because of the low performance. 
A simple SLURM job submission script would look like the following:
```
#!/bin/bash -l
#SBATCH --nodes=2
#SBATCH --ntasks=72
#SBATCH --time=00:30:00

srun -n $SLURM_NTASKS ./test.exe 
```

The flag `-l` at the beginning allows you to call the module command within the script, in case you need it.

# SLURM batch queues

Name of the queue |	Max time | Max running jobs per user | Max number nodes
--- | --- | --- | ---
normal | 5 hours | - |	164

The list of queues and partitions is available typing __sinfo__ or __scontrol show partition__. The command `sinfo -o "%30N %20b %f"` will show the active and available features of each node on the system. 
Note that not all groups are enabled on every partition, please check the `AllowGroups` entry of the command
`scontrol show partition <partition_name>`.

You can choose the queue where to run your job by issuing the `--partition` directive in your batch script: 
`#SBATCH --partition=<partition_name>`

Please check the man pages and the official documentation for further details on SLURM directives.
For a list of the most useful SLURM commands, have a look at the corresponding entry in the FAQ list.
