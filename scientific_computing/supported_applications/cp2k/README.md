# CP2K

CP2K is a program to perform atomistic and molecular simulations of solid state, liquid, molecular, and biological systems. It provides a general framework for different methods such as e.g., density functional theory (DFT) using a mixed Gaussian and plane waves approach (GPW) and classical pair and many-body potentials.

CP2K is freely available under the [GPL license](http://www.gnu.org/licenses/gpl.html#TOC1). It is written in Fortran 95 and can be run efficiently in parallel.

Key characteristics of CP2K:
 * Fist: classical molecular dynamics
 * Kim-Gordon Models
 * Quickstep: Density functional calculations

# Licensing Terms and Conditions

The sources of CP2K are free for all users [GPL license](http://www.gnu.org/licenses/gpl.html#TOC1) and stable versions of the code are available from the [CP2K repository](http://sourceforge.net/projects/cp2k). Publications of results obtained with CP2K should acknowledge its use by an appropriate citation (see [CP2K Homepage](http://www.cp2k.org)).

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the daint-gpu modulefile:
```bash
module load daint-gpu (or daint-mc)
module avail CP2K
```

The previous set of commands will show the gpu enabled modules of the applications. The following module command will then load the environment of the default version of the program:
```bash
module load CP2K
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:
```bash
module show CP2K
module help CP2K
```

# How to Run on Piz Daint

The following job script asks for 64 nodes, using 1 MPI task per node and 12 OpenMP threads per MPI task. If you use more MPI tasks per node you will have less memory per MPI task. If you use multiple MPI tasks per node, you need to set CRAY_CUDA_MPS=1 to enable the tasks to access the GPU device on each node at the same time.

```bash
#!/bin/bash -l
#
# CP2K on Piz Daint: 64 nodes, 1 MPI task per node, 12 OpenMP threads per task
#
#SBATCH --job-name=cp2k
#SBATCH --time=01:00:00
#SBATCH --nodes=64
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=12
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load CP2K
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
ulimit -s unlimited
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK cp2k.psmp cp2k.inp
```

# Further Documentation

[CP2K Homepage](http://www.cp2k.org)

[CP2K Online Manual](http://manual.cp2k.org)
