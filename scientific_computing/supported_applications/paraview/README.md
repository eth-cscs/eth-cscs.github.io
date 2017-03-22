# ParaView

ParaView is an open-source, multi-platform data analysis and visualization application. ParaView users can quickly build visualizations to analyze their data using qualitative and quantitative techniques. The data exploration can be done interactively in 3D, with client-server interactive sessions where data are kept locally on Piz Daint's scratch filesystem, while the GUI and rendering display are sent to remote desktops. Alternatively, the data visualization can be done programmatically using ParaView’s batch processing capabilities with server-side python-driven scripts running on Piz Daint compute nodes.

# Licensing Terms and Conditions

ParaView is distributed [free of charge](http://www.paraview.org/download) with source code.

# Setup

ParaView uses GPUs for accelerated rendering. You will need to load the daint-gpu module and the ParaView module:

```bash
module load daint-gpu
module load ParaView
```

# How to Run on Piz Daint

## Batch-mode with Python scripts

The following job script asks for 8 nodes, using 8 MPI task per node. ParaView has a special executable called ``pvbatch`` to execute parallel Python scripts. Users will provide their Python code (e.g. file script.py) as an input to pvbatch.

```bash
!/bin/bash -l
#
# ParaView on Piz Daint
#
# 8 nodes, 8 MPI task per node
#
#SBATCH --job-name="ParaView"
#SBATCH --time=01:00:00
#SBATCH --nodes=8
#SBATCH --ntasks=64
#SBATCH --constraint=startx,gpu
#========================================
# load modules
export DISPLAY=:0
module load daint-gpu
module load ParaView

srun -n $SLURM_NTASKS -N $SLURM_NNODES pvbatch --disable-xdisplay-test script.py
```

## Interactive mode with a client-server connection

A ParaView client on the User's remote desktop needs a host profile to connect to a remote server. Linux and Mac users will find a profile for daint in /apps/daint/UES/ParaView/server_daint.pvsc; Windows users must instead use the file /apps/daint/UES/ParaView/server_daint_Windows.pvsc. You need to copy this file to your remote desktop, start ParaView, and use the "File->Connect->Load Servers" command to install it on your local copy of the application.
This config file also needs a shell script generating a SLURM job. You will find this in /apps/daint/UES/ParaView/rc-submit-pvserver-xserver.sh.
Our advice is for you to make a copy of this file in your home on the daint filesystem, so that you can modify it further for your needs. You will then need to modify the file’s pathname in servers.pvsc.

Linux and Mac users will need one additional setup, to enable your desktop to directly connect to daint. Edit your $HOME/.ssh/config file to include the following lines:

```bash
Host daint*.cscs.ch
      ForwardAgent yes
      Port 22
      ProxyCommand ssh -q -Y <username>@ela.cscs.ch netcat %h %p -w 10
```

Windows users need a putty profile which will be sent to you upon request. Please contact vis-rt@cscs.ch. Once setup, you may start paraview in interactive mode and create a connection. Use the menu File->Connect and double-click on the option “Reverse-Connect-Daint”.
A popup menu will help you select the number of paraview servers called `pvserver`, the number of tasks per node, and other attributes of your SLURM job. You will also need your Unix Id (type the command "id" on daint, and read the "uid" number. Insert that number instead of the 11111 used as default in the pvserver port entry. The SLURM job file will be created, and submitted, enabling a parallel ParaView server to automatically connect itself to your client application.
<br />
