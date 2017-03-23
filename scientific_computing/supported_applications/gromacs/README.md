# GROMACS

GROMACS is a versatile package to perform molecular dynamics, i.e. simulate the Newtonian equations of motion for systems with hundreds to millions of particles.

It is primarily designed for biochemical molecules like proteins, lipids and nucleic acids that have a lot of complicated bonded interactions, but since GROMACS is extremely fast at calculating the nonbonded interactions (that usually dominate simulations) many groups are also using it for research on non-biological systems, e.g. polymers.

# Licensing Terms and Conditions

Gromacs is a joint effort, with contributions from developers around the world: users agree to acknowledge use of GROMACS in any reports or publications of results obtained with the Software (see [GROMACS Homepage](http://www.gromacs.org/) for details).

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the daint-gpu modulefile:

```bash
module load daint-gpu
module avail GROMACS
```

The following module command will load the environment of the default version of the program:
```
module load GROMACS
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:
```bash
module show GROMACS
module help GROMACS
```

# How to Run on Piz Daint

The following job script asks for 64 nodes, using 12 MPI tasks per node and 2 OpenMP threads per MPI task. If you use more MPI tasks per node you will have less memory per MPI task. If you use multiple MPI tasks per node, you need to set CRAY_CUDA_MPS=1 to enable the tasks to access the GPU device on each node at the same time.

```bash
#!/bin/bash -l
#
# GROMACS on Piz Daint: 64 nodes, 12 MPI tasks per node, 2 OpenMP threads per task using hyperthreading (--ntasks-per-core=2)
#
#SBATCH --job-name=gromacs
#SBATCH --time=01:00:00
#SBATCH --nodes=64
#SBATCH --ntasks-per-node=12
#SBATCH --ntasks-per-core=2
#SBATCH --cpus-per-task=2
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load GROMACS
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
export CRAY_CUDA_MPS=1
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK gmx_mpi mdrun -s input.tpr
```

# Further Documentation

[GROMACS Homepage](http://www.gromacs.org/)

[GROMACS Manual](http://www.gromacs.org/Documentation/Manual)
