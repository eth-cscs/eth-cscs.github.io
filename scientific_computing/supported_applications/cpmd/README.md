# CPMD

# Information on CPMD

The CPMD code is a plane wave/pseudopotential implementation of Density Functional Theory, particularly designed for ab-initio molecular dynamics. Its first version  was developed by Jurg Hutter at IBM Zurich Research Laboratory starting from the original Car-Parrinello codes. During the years many people from diverse organizations contributed to the development of the code and of its pseudopotential library:

M. Parrinello, J. Hutter, D. Marx, P. Focher, M. Tuckerman, W. Andreoni, A. Curioni, M. Boero, E. Fois, U. Roetlisberger, P. Giannozzi, T. Deutsch, A. Alavi, D. Sebastiani, A. Laio, J. VandeVondele, I. Tavernelli, A. Seitsonen, S. Billeter, V. Weber, T. Laino, I. Fedulova and others.

The current version, 4.1, is copyrighted jointly by IBM Corp and by Max Planck Institute, Stuttgart, and is distributed free of charge to non-profit organizations ( see download ). Profit organizations interested at the code should contact the CPMD consortium www.cpmd.org .

CPMD runs on many different computer architectures and it is well parallelized (MPI and Mixed MPI/SMP).

# CPMD capabilities

-    Works with norm conserving or ultrasoft pseudopotentials
-    LDA, LSD and the most popular gradient correction schemes; free energy density functional implementation
-    Isolated systems and system with periodic boundary conditions; k-points
-    Molecular and crystal symmetry
-    Wavefunction optimization: direct minimization and diagonalization
-    Geometry optimization: local optimization and simulated annealing
-    Molecular dynamics: constant energy, constant temperature and constant pressure
-    Path integral MD
-    Response functions
-    Excited states
-    Many electronic properties
-    Time-dependent DFT (excitations, molecular dynamics in excited states)
-    Coarse-grained non-Markovian metadynamics

# Licensing Terms and Conditions

**Users are kindly asked to obtain their own license:** academic users should register on the [CPMD webpage](www.cpmd.org/download) and provide the registration confirmation. Only users belonging to group cpmd with a valid CPMD license are allowed to access CPMD executables and library files.

## Setup

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the **daint-gpu** modulefile:

```bash
module load daint-gpu
module avail CPMD
```

The following module command will load the environment of the default version of the program:

```bash
module load CPMD
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:

```bash
module show CPMD
module help CPMD
```

The executable name is cpmd.x: a test executable test-cpmd_omp.x is not yet meant for production jobs, as it is currently being tested for MPI/OpenMP jobs.
How to Run on Piz Daint

The following job script asks for 576 MPI tasks on 16 nodes. Therefore the maximum amount of memory will be 1.7 Gb per task. Use even less cores per node if you need more memory per MPI task, e.g.: set --ntasks-per-node=18 to ask for 576 tasks with 3.4 Gb per task on 32 nodes.

```bash
#!/bin/bash -l
#
# CPMD on Piz Daint: 16 nodes, 36 MPI tasks per node
#
#SBATCH --job-name=cpmd
#SBATCH --time=01:00:00
#SBATCH --nodes=16
#SBATCH --ntasks-per-node=36
#SBATCH --constraint=mc
#========================================
# load modules and run simulation
module load daint-mc
module load CPMD
ulimit -s unlimited
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK cpmd.x input.in
```

# Further Documentation

[CPMD Homepage](www.cpmd.org)

[CPMD Tutorial](www.cpmd.org/cpmd-tutorial)
