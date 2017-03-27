# LAMMPS

LAMMPS is a classical molecular dynamics code that models an ensemble of particles in a liquid, solid, or gaseous state. It can model atomic, polymeric, biological, metallic, granular, and coarse-grained systems using a variety of force fields and boundary conditions. The current version of LAMMPS is written in C++.

# Licensing Terms and Conditions

LAMMPS is a freely-available open-source code, distributed under the terms of the [GNU Public License](http://www.gnu.org/copyleft/gpl.html).

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the `daint-gpu` modulefile:

```bash
module load daint-gpu
module avail LAMMPS
```

The following module command will load the environment of the default version of the program:
```bash
module load LAMMPS
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:
```bash
module show LAMMPS
module help LAMMPS
```

# How to Run on Piz Daint

The following job script asks for 64 nodes, using 2 MPI tasks per node and 1 OpenMP thread per MPI task. If you use more MPI tasks per node you will have less memory per MPI task. If you use multiple MPI tasks per node, you need to set `CRAY_CUDA_MPS=1` to enable the tasks to access the GPU device on each node at the same time.

```bash
#!/bin/bash -l
#
# LAMMPS on Piz Daint: 64 nodes, 2 MPI tasks per node, 1 OpenMP thread per task
#
#SBATCH --job-name=lammps
#SBATCH --time=01:00:00
#SBATCH --nodes=64
#SBATCH --ntasks-per-node=2
#SBATCH --cpus-per-task=1
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load LAMMPS
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
export CRAY_CUDA_MPS=1
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK lmp_mpi -sf gpu -in input.in
```

> Please note that if you want to use the hybrid MPI+OpenMP version of LAMMPS you need to load the `daint-mc` module and use the `lmp_omp` executable.


# Further Documentation

[LAMMPS Homepage](http://lammps.sandia.gov/)

[LAMMPS Online Manual](http://lammps.sandia.gov/doc/Manual.html)
