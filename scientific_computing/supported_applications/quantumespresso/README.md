# Quantum ESPRESSO

Quantum ESPRESSO is an integrated suite of Open-Source computer codes for electronic-structure calculations and materials modeling at the nanoscale. It is based on density-functional theory, plane waves, and pseudopotentials:

* PWscf (Plane-Wave Self-Consistent Field)
* FPMD (First Principles Molecular Dynamics)
* CP (Car-Parrinello)

# Licensing Terms and Conditions

Quantum ESPRESSO is an open initiative, in collaboration with many groups world-wide, coordinated by the [Quantum ESPRESSO Foundation](http://foundation.quantum-espresso.org).
Scientific work done using Quantum ESPRESSO should contain an explicit acknowledgment and reference to the main papers (see [Quantum Espresso Homepage](http://www.quantum-espresso.org) for the details).

# Set up

You can see a list of the available versions of the program installed on the machine after loading the gpu or multicore modulefile. In the examples below we use the daint-mc modulefile:
```bash
module load daint-mc
module avail QuantumESPRESSO
```
The following module command will load the environment of the default version of the program:
```bash
module load QuantumESPRESSO
```

You can either type this command every time you intend to use the program within a new session, or you can automatically load it by including it in your shell configuration file.

The following module commands will print the environment variables set by loading the program and a help message:
```bash
module show QuantumESPRESSO
module help QuantumESPRESSO
```

# How to Run on Piz Daint

The following job script asks for 64 nodes, using 1 MPI task per node and 12 OpenMP threads per MPI task. If you use more MPI tasks per node you will have less memory per MPI task.
```bash
#!/bin/bash -l
#
# QuantumESPRESSO on Piz Daint: 16 nodes, 36 MPI tasks per node,
# 2 OpenMP threads per task using hyperthreading (--ntasks-per-core=2)
#
#SBATCH --job-name=espresso
#SBATCH --time=01:00:00
#SBATCH --nodes=16
#SBATCH --ntasks-per-core=2
#SBATCH --ntasks-per-node=36
#SBATCH --cpus-per-task=2
#SBATCH --constraint=mc
#========================================
# load modules and run simulation
module load daint-mc
module load QuantumESPRESSO
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
ulimit -s unlimited
srun -n $SLURM_NTASKS --ntasks-per-node=$SLURM_NTASKS_PER_NODE -c $SLURM_CPUS_PER_TASK pw.x -in input.in
```

# Further Documentation

[Quantum ESPRESSO Homepage](http://www.quantum-espresso.org)

[Quantum ESPRESSO Documentation](http://www.quantum-espresso.org/?page_id=40)
