# VisIt
VisIt is another open-source, interactive, scalable, visualization, animation and analysis tool provided for CSCS Users. The data exploration can be done interactively in 3D, with client-server interactive sessions where data are kept locally on Piz Daint's scratch filesystem, while the GUI and rendering display are sent to remote desktops. Alternatively, the data visualization can be done programmatically using VisIt’s command-line interface (CLI) with python-driven scripts running on Piz Daint compute nodes.

# Licensing Terms and Conditions

VisIt is distributed [free of charge](https://wci.llnl.gov/simulation/computer-codes/visit/downloads) with source code.

# Setup

VisIt does not use GPUs for accelerated rendering. You should load the daint-mc module and the VisIt module. Should you only have an allocation on the GPU partition, you may also use the daint-gpu module, but be aware that rendering with be software-based:

```bash
module load daint-mc
module load Visit
```

# How to Run on Piz Daint

## Batch-mode with Python scripts
The following job script asks for 8 nodes, using 8 MPI task per node. Users will provide their Python code (e.g. file script.py) as an input to visit.

```bash
!/bin/bash -l
#
# VisIt on Piz Daint
#
# 8 nodes, 8 MPI task per node
#
#SBATCH --job-name="VisIt"
#SBATCH --time=01:00:00
#SBATCH --nodes=8
#SBATCH --ntasks=64
#========================================
# load modules
module load daint-mc
module load Visit

srun -n $SLURM_NTASKS -N $SLURM_NNODES -C mc --cpu_bind=sockets visit -nowin -cli -s script.py
```
## Interactive mode with a client-server connection
VisIt needs a host profile to connect to a remote location. You will find a profile for daint in /apps/daint/UES/6.0.UP02/VisIt/host_daint.xml and you need to copy this file to your private directory $HOME/.visit/hosts, on your desktop.

When opening a remote connection, VisIt also needs to know where its executables are located. Thus, you must include the command module load Visit inside your .bashrc file such that any ssh command can find it.
Opening a parallel server is done with the following steps:

* Select the menu “Open file”, select the name of the host to be “daint”. This will trigger the execution of VisIt’s mdserver on daint's loggin node. You should then have a listing of your file system
* Select a file to open: a popup menu will let you choose the number of processors and number of nodes for your parallel job. Upon successful connection to a parallel compute server, you may verify its status with the menu "File->Compute engines".

