# NAMD

NAMD is a parallel molecular dynamics code designed for high-performance simulation of large biomolecular systems. Based on [Charm++ parallel objects](https://charm.cs.uiuc.edu/), NAMD [scales](http://www.ks.uiuc.edu/Research/namd/performance.html) to hundreds of cores for typical simulations and uses the molecular graphics program [VMD](http://www.ks.uiuc.edu/Research/vmd/) for simulation setup and trajectory analysis, but is also file-compatible with AMBER, CHARMM, and X-PLOR.

## Licensing Terms and Conditions

NAMD is distributed [free of charge](http://www.ks.uiuc.edu/Research/namd/license.html) with source code. Users agree to acknowledge use of NAMD in any reports or publications of results obtained with the Software (see [NAMD Homepage](http://www.ks.uiuc.edu/Research/namd/) for details).

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore module, by typing:

```bash
module load daint-gpu
module avail NAMD
```

for the gpu version or

```bash
module load daint-mc
module avail NAMD
```

for the multicore one. The previous set of commands will show the gpu or multicore enabled modules of the applications. The following module command will then load the environment of the default version of the program:

```bash
module load NAMD
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:

```bash
module show NAMD
module help NAMD
```

# How to Run on Piz Daint

The CUDA-enabled version of NAMD is installed on Daint. When using this version you should set outputEnergies to 100 or higher in the simulation config file, as outputting energies from the GPU is slower compared to the CPU, and you should add `+idlepoll` to the command line in order to poll the GPU for results rather than sleeping while idle. Note that some features are unavailable in the CUDA build, including alchemical free energy perturbation and the Lowe-Andersen thermostat.

The GPU code in NAMD is relatively new (introduced first in NAMD 2.7), and forces evaluated on the GPU differ slightly from a CPU-only calculation, so you should test your simulations well before launching production runs.

Note that multiple NAMD processes (or threads) can share the same GPU, and thus it is possible to run with multiple processes per node (see below).

The following job script asks for 64 nodes, using 1 MPI task per node and 24  threads per MPI task with hyperthreading turned on. If you use more than one MPI task per node you will need to set `CRAY_CUDA_MPS=1` to enable the tasks to access the GPU device on each node at the same time.

```bash
#!/bin/bash -l
#
# NAMD on Piz Daint
#
# 64 nodes, 1 MPI task per node, 24 OpenMP threads per task with hyperthreading (--ntasks-per-core=2)
#
#SBATCH --job-name="namd"
#SBATCH --time=01:00:00
#SBATCH --nodes=64
#SBATCH --ntasks-per-core=2
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=24
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load NAMD
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK namd2 +idlepoll +ppn $[SLURM_CPUS_PER_TASK-1] input.namd > namd.out
```

# Further Documentation

[NAMD Homepage](http://www.ks.uiuc.edu/Research/namd/)

[NAMD User's Guide](http://www.ks.uiuc.edu/Research/namd/2.12/ug/)
