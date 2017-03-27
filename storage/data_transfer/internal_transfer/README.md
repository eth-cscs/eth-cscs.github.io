# Internal Transfer

The SLURM queue __xfer__ is available on Piz Daint only to address data transfers between internal CSCS file systems. The queue has been created to transfer files and folders from `/users`, `/project` or `/store` to the `/scratch` file systems (stage-in) and vice versa (stage-out). Currently the following commands are available on the cluster supporting the queue __xfer__:
* `cp`
* `mv`
* `rm`
* `rsync`

You can adjust the SLURM batch script below to transfer your input data on `$SCRATCH`, setting the variable command to the command that you intend to use from the list above:
```bash
#!/bin/bash -l
#
#SBATCH --time=02:00:00
#SBATCH --ntasks=1
#SBATCH --partition=xfer
module unload xalt
command="rsync -av"
echo -e "$SLURM_JOB_NAME started on $(date):\n $command $1 $2\n"
srun -n $SLURM_NTASKS $command $1 $2
echo -e "$SLURM_JOB_NAME finished on $(date)\n"
 
if [ -n "$3" ]; then 
 # submit job with dependency
 sbatch --dependency=afterok:$SLURM_JOB_ID $3
fi 
```

The template SLURM batch script above requires at least two command line arguments, which are the source and the destination files or folders to be copied.
The stage script may take as third command line argument the name of the production SLURM batch script to be submitted after the stage job: the SLURM dependency flag `--dependency=afterok:$SLURM_JOB_ID` ensures that the production job can begin execution only after the stage job has successfully executed (i.e. ran to completion with an exit code of zero).
The command `module unload xalt` is inserted at the beginning of the template script to avoid getting in output the following harmless error message:
```bash
XALT_EXCEPTION(xalt_run_submission.py):  [Errno 2] No such file or directory
```

You can submit the stage job with a meaningful job name as below:
```bash
# stage-in and production jobs
$ sbatch --job-name=stage_in stage.sbatch ${PROJECT}/<source> ${SCRATCH}/<destination> production.sbatch
```

The SLURM flag `--job-name` will set the name of the stage job that will be printed in the SLURM output file: the latter is by default the file `slurm-${SLURM_JOB_ID}.out`, unless you set a specific name for output and error using the SLURM flags `-e/--error` and/or `-o/--output` (e.g.: `-o %j.out -e %j.err`, where the SLURM symbol `%j` will be replaced by `$SLURM_JOB_ID`).
The stage script will also submit the SLURM batch script production.sbatch given as third command line argument.
The production script can submit in turn a stage job to transfer the results back. E.g.:
```bash
# stage-out
sbatch --dependency=afterok:${SLURM_JOB_ID} --job-name=stage_out stage.sbatch ${SCRATCH}/<source> ${PROJECT}/<destination> 
```

Note that due to a mismatch of the SLURM configuration between the data transfer server and Piz Daint you will see a harmless error message in your SLURM error file, which we kindly ask you to ignore:
```bash
slurmstepd: error: (task_cray.c: 716: _get_numa_nodes) Failed to open file /dev/cpuset/slurm/uid_21827/job_614579/step_batch/cpuset.mems: No such file or directory
slurmstepd: error: (task_cray.c: 507: task_p_post_step) get_numa_nodes failed. Return code: -1
```
