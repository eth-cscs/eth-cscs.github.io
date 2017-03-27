# Piz Daint

Piz Daint uses SLURM for submission, monitoring and control of parallel jobs. Parallel programs compiled with Cray-MPICH (the MPI library available on this system) must be run using the `srun` command. SLURM batch scripts need to be submitted with the `sbatch` command from the `$SCRATCH` folder, since users are __NOT__ supposed to run jobs from different filesystems because of the low performance. A simple SLURM job submission script would look like the following:
```bash
#!/bin/bash -l
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=12
#SBATCH --ntasks-per-core=2
#SBATCH --cpus-per-task=2
#SBATCH --constraint=gpu
#SBATCH --time=00:30:00

export CRAY_CUDA_MPS=1
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
module load daint-gpu

srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK ./test.exe 
```

The flag `-l` at the beginning allows you to call the module command within the script, for instance to load the GPU enabled software stack in the `MODULEPATH` with the module `daint-gpu`. Alternatively, the module `daint-mc` will make the multicore software stack available in your `MODULEPATH` instead.

The SLURM option `--constraint=gpu` makes sure that the SLURM scheduler allocates the XC50 Intel Haswell 12-core nodes with GPU devices and automatically sets the option `--gres=gpu:1`.

The SLURM option `--constraint=mc` ensures that the batch job is allocated to the multicore XC40 Intel Broadwell 2 x 18-core nodes and not to the GPU nodes. You need to use this constraint when selecting the partition prepost.

It is required to specify either `--constraint=gpu` or `--constraint=mc`.  The srun flags `-n`, `--ntasks-per-node` and `-c` take as argument the number of MPI tasks allocated, the number of MPI tasks per node and the number of threads per MPI task: please have a look at man srun for more details on these options.

You can target the large memory nodes on the multicore portion of the system using the SLURM flag `--mem=120GB`.

# SLURM batch queues

Name of the queue | Max time | Max nodes | Brief Description
--- | --- | --- | ---
debug | 30min | 4 | Quick turnaround for test jobs
low | 6 h | 2400 | For use only when allocations are exhausted
normal | 24 h | 2400 | Standard queue for production work
high | 24 h | 2400 | High priority queue, time is charged double
large | 12 h | 4400 | Large scale work, by arrangement only
prepost | 30min | 1 | High priority pre/post processing
xfer | 24h | 1 | Data transfer queue
total | 2 h | | CSCS maintenance queue (restricted use)

The list of queues and partitions is available typing `sinfo` or `scontrol show partition`. Note that not all groups are enabled on every partition, please check the `AllowGroups` entry of the command `scontrol show partition`.

You can choose the queue where to run your job by issuing the `--partition` directive in your batch script: `#SBATCH --partition=<partition_name>`

Please check the man pages and the official documentation for further details on SLURM directives.
For a list of the most useful SLURM commands, have a look at the corresponding entry in the [FAQ list](/getting_started/faq).
