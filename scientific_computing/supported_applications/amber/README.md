# Amber

Amber (Assisted Model Building with Energy Refinement) is a collective name for a suite of programs that allow users to carry out molecular dynamics simulations, particularly on biomolecules. AMBER comprises a molecular mechanical force field for the simulation of biomolecules (which is in general use in a variety of simulation programs) and a package of molecular simulation programs which includes source code and demos.

# Licensing Terms and Conditions

Amber is maintained and distributed by UCSF. Users agree to acknowledge use of Amber in any reports or publications of results obtained with the Software (ref. to [AMBER Homepage](http://ambermd.org/) for details).

# Setup

Before loading Amber, you will need to decide whether you need the GPU-enabled version or not and first load the corresponding CSCS software stack module (i.e., `daint-gpu` or `daint-mc`, respectively).

You can see a list of the available versions of the program installed on the machine typing:

```bash
module load daint-gpu # or daint-mc
module avail Amber
```

The following module command will load the environment of the default version of the program:

```bash
module load Amber
```

Depending on the software stack you have loaded, the above command will either load the CUDA-enabled MPI-parallel version of Amber (`daint-gpu` s/w stack) or the MPI-parallel version of Amber (`daint-mc` s/w stack).

Please note that the default Amber module will only load Amber solver.
If you want to use the accompanying tools, you should switch to the serial Amber module:

```bash
module switch Amber Amber/16-2016.11-CrayGNU-2016.11-serial
```

The following module commands will print the environment variables set by loading the program and a help message:

```bash
module show Amber
module help Amber
```

# How to Run on Piz Daint

The following job script asks for 192 MPI tasks on 16 nodes with a GPU.
Setting `CRAY_CUDA_MPS=1` enables to access the GPU device on each node from multiple MPI tasks at the same time:

```bash
#!/bin/bash -l
#
# Amber on Piz Daint
#
# 192 MPI tasks, 16 nodes, no hyperthreading
#
#SBATCH --job-name="amber"
#SBATCH --time=01:00:00
#SBATCH --ntasks=192
#SBATCH --ntasks-per-node=12
#SBATCH --constraint=gpu
#========================================
# load modules and run simulation
module load daint-gpu
module load Amber
export CRAY_CUDA_MPS=1
srun pmemd.cuda.MPI -O -i file.in -o file.out -p file.prmtop -c file.rst -r file.rst -x file.trj -e file.ene
```

# Further Documentation

* [AMBER Homepage](http://ambermd.org/)
