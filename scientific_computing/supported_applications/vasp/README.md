# VASP

The Vienna Ab initio Simulation Package (VASP) is a computer program for atomic scale materials modelling, e.g. electronic structure calculations and quantum-mechanical molecular dynamics, from first principles.

VASP computes an approximate solution to the many-body Schrödinger equation, either within density functional theory (DFT), solving the Kohn-Sham equations, or within the Hartree-Fock (HF) approximation, solving the Roothaan equations. Hybrid functionals that mix the Hartree-Fock approach with density functional theory are implemented as well. Furthermore, Green's functions methods (GW quasiparticles, and ACFDT-RPA) and many-body perturbation theory (2nd-order Møller-Plesset) are available in VASP.

In VASP, central quantities, like the one-electron orbitals, the electronic charge density, and the local potential are expressed in plane wave basis sets. The interactions between the electrons and ions are described using norm-conserving or ultrasoft pseudopotentials, or the projector-augmented-wave method. To determine the electronic groundstate, VASP makes use of efficient iterative matrix diagonalisation techniques, like the residual minimisation method with direct inversion of the iterative subspace (RMM-DIIS) or blocked Davidson algorithms. These are coupled to highly efficient Broyden and Pulay density mixing schemes to speed up the self-consistency cycle.

# Licensing Terms and Conditions

Users are kindly asked to obtain their own license, CSCS cannot provide free access to the code and needs to inform the VASP group with an updated list of users. Therefore only users belonging to group vasp with a valid VASP license are allowed to access VASP executables and library files.

# Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the daint-gpu modulefile:
```bash
module load daint-gpu
module avail VASP
```

The following module command will load the environment of the default version of the program:
```bash
module load VASP
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:
```bash
module show VASP
module help VASP
```

# How to Run on Piz Daint

The following job script asks for 64 nodes, using 1 MPI task per node. If you use more MPI tasks per node you will have less memory per MPI task. If you use multiple MPI tasks per node, you need to set CRAY_CUDA_MPS=1 to enable the tasks to access the GPU device on each node at the same time.

```bash
#!/bin/bash -l
#
# VASP on Piz Daint: 64 nodes, 1 MPI task per node, 1 OpenMP thread per task
#
#SBATCH --job-name=vasp
#SBATCH --time=01:00:00
#SBATCH --nodes=64
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=1
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load VASP
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
ulimit -s unlimited
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK vasp_std
```

Further Documentation

[VASP Homepage](http://www.vasp.at)

[VASP User Guide](http://cms.mpi.univie.ac.at/vasp/vasp/vasp.html)
