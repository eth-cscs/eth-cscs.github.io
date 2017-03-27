# Mönch

Mönch uses SLURM for submission, monitoring and control of parallel jobs. 
Parallel programs compiled with MVAPICH/Intel must be run using the command `mpirun -rmk slurm`, 
while `mpirun` must be used with OpenMPI. 
Otherwise you should use `srun`: authorized users can check the [dedicated Wiki page](https://monchwiki.cscs.ch) for further details. 
SLURM batch scripts need to be submitted with the sbatch command from the `$SCRATCH` folder, 
since users are __NOT__ supposed to run jobs from different filesystems because of the low performance. 
A simple SLURM job submission script would look like the following:

```bash
#!/bin/bash -l

#SBATCH --nodes=2
#SBATCH --ntasks=40
#SBATCH --time=00:30:00

srun -n $SLURM_NTASKS ./test.exe 
```

The flag `-l` at the beginning allows you to call the module command within the script, in case you need it.

# SLURM batch queues

Name of the queue	| Max time | Max running jobs per user | Max number of virtual cores
--- | --- | --- | ---
dphys_compute | 1 day |	10000 (whole cluster) |	12480
dphys_largemem | 1 day | 10000 (whole cluster) | 1600
dphys_hugemem | 1 day	| 10000 (whole cluster) |	960
dphys_largemem_wk | 7 days | 10000 (whole cluster) | 1600
dphys_hugemem_wk | 7 days	| 10000 (whole cluster) |	960
fichtner_compute | 1 day | 10000 (whole cluster) | 12480
parrinello_compute | 1 day | 10000 (whole cluster) | 12480
spaldin_compute | 1 day |	10000 (whole cluster) | 12480

The list of queues and partitions is available typing `sinfo` or `scontrol show partition`. 
Note that not all groups are enabled on every partition, please check the `AllowGroups` entry of the command 
`scontrol show partition <partition_name>`.

You can choose the queue where to run your job by issuing the `--partition` directive in your batch script:
`#SBATCH --partition=<partition_name>`

Please check the man pages and the official documentation for further details on SLURM directives.
For a list of the most useful SLURM commands, have a look at the corresponding entry in the [FAQ list](/getting_started/faq).
