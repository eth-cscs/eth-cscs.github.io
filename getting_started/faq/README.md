# Access and Accounting

---

## How to get an account at CSCS?

The forms to be filled in to get and account as Principal Investigator (PI) or new member of a group within an existing project can be found on the [CSCS web site](http://www.cscs.ch), under the __User Lab__ section (__Applying for Accounts__).

---

## Can you allow an existing user to charge computing time on my project?

We will allow the user to charge your allocation as a secondary project, when the request will be approved by the principal investigator of the project.

---

## I'm not able to login on the systems due to `Host key verification failed`
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

Please proceed as suggested by the WARNING message, deleting all the entries wth the name of the system from your `.ssh/known_hosts` file. The same procedure applies in case of the error message:
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: POSSIBLE DNS SPOOFING DETECTED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

E.g. for Ela:
```
sed -i '/^ela/d' ~/.ssh/known_hosts
```
This command will delete all lines beginning with "ela" from the file `.ssh/known_hosts`, then you should be prompted only once a message like the following:
```
The authenticity of host 'ela.cscs.ch' can't be established.
[...] Are you sure you want to continue connecting (yes/no)?
```
Type `yes`. In case you are prompted similar messages again, delete manually all lines in the `.ssh/known_hosts` file or even the file itself and try again.

---

## How can I set up a passwordless access to CSCS systems from Ela?

You can generate a public/private rsa key pair on the system of your choice:

* `ssh-keygen` You will be asked to Enter file in which to save the key: just confirm the default pressing enter. Then you will be asked to Enter passphrase;
* `ssh-copy-id -i .ssh/id_rsa.pub ela1` to copy your key on ela1;
* Follow the instructions printed on screen and try to login: `ssh ela1`. You should be able to log on Ela from the chosen system without typing passwords, and viceversa.

---

## Direct access to CSCS machines from local clients

In order to login on CSCS systems you need to access the front-end Ela first. If you want to copy your output files from a CSCS production system to your local client, outgoing connections will work if your client has a static IP address. Otherwise, you can configure your local client to forward the connection from Ela to the CSCS system that you wish to access, editing the file `.ssh/config` on your local client.

For instance, you might write the following in `.ssh/config` for Piz Daint:
```
host daint
Hostname daint.cscs.ch
User <username>
ForwardAgent yes
Port 22
ProxyCommand ssh -q -Y <username>@ela.cscs.ch netcat %h %p -w 10
```
Then you will be able to run the command `ssh` or `scp` on your local client outside CSCS:
```
$ scp daint <path> <localpath>
```
Please note that you need to edit `username`, `<path>` and `<localpath>`, since they are user specific.

## How can I check the usage of my budget?

You can check the usage of your budget on the systems at CSCS with two scripts:
* `sbucheck` \(per-project usage of the budget allocated quarterly\)
* `monthly_usage` \(use option `--individual` to see a per-user breakdown\)

You can find more details on these two commands under [Compute Budget](../compute_budget). You can also check your account following the links under the section My Projects on the [CSCS User Portal](/).

---

## How to write on `/project` when I belong to more than one group?

If you belong to more than one project, you should see the corresponding group IDs issuing the command `groups` on your shell. You are always logged in as your primary project: therefore, if wish to write on the `/project` folder of a secondary group (e.g. with group ID `sXYZ`), you will need to change project ID using the following command: `newgrp sXYZ`.

Then you will be able to write on `/project/sXYZ` and to check the computing budget of the secondary project with the usual commands `sbucheck` and `monthly_usage`. For further details on the command `newgrp`, please have a look at `man newgrp`.

---

# Job Scheduler

---

## Why my jobs on CSCS machines don't start?

Please check the priority of your submitted job: your jobs will have less priority if your are overusing the budget and you will likely wait more in the queue if you set a longer wall time. You can check the usage of your budget against what is expected typing the command `monthly_usage`.

Please have a look at the CSCS User Portal for more details on how to check your budget.

---

## How can I run my jobs under a specific project?

If you are a member of the group `<gid>`, you can use the following directive:
```
#SBATCH --account=<gid>
```
This will tell SLURM to charge the compute budget of the selected group for the current job. In case your username belongs to different projects, you can override the default account using the SLURM flag `-A/--account=` when calling `sbatch` or `salloc`. You can do this also adding the line above in your SLURM batch script.

---

## I would like to increase the priority of my runs, as I am always waiting while other users run

You have likely already reached almost 100% of your budget, whereas the other projects that you mention used less: manually adjusting the priorities is not possible, since it would prevent a fair share of the computing resources among our users.

---

## Can I extend the wall time of a pending job?

Some SLURM settings of a pending job can be modified using the command `scontrol update`: you should use the same format of the show command. E.g.:
```
scontrol update JobId=2543 Name=newtest TimeLimit=00:10:00
```
The command above will set a new job name and time limit to the pending job with `JobId 2543`: the command will fail to change the time limit if the job is in state `R (RUNNING)`, but it will still manage to update the job name.

---

## Why do I get the error __invalid account__ when submitting a job?
```
salloc: error: Failed to allocate resources: Invalid account or account/partition combination specified.
```

The error __Invalid account__ might depend on the lack of resources associated to your project: please check it typing `sbucheck` on your shell. If you have manually selected a secondary group as SLURM account using the SLURM option `-A` or `--account=`, then please check your group membership with the command `groups`: if the project ID does not appear among your groups, then you won't be allowed to use it to run your jobs until you clarify group membership with the principal investigator (PI) of the project.

---

## Where can I get tips to use efficiently Cray machines?

Please have a look at the pages on [how to run a batch job](../running_jobs). If you wish to improve the performance of your code, you might use the [Performance Tools](/scientific/computing/performance_tools) available on the systems.

---

## I run successfully my executable but it is not listed in the queue

You should not run on the login nodes of the system, as they are a shared resource. In order to submit batch jobs, you need to create a SLURM script that contains the correct header information so that the scheduler can allocate resources and place your job in the queue. Please have a look at the page on [how to run a batch job](../running_jobs).

---

## How can I optimize the number of tasks per node to get more memory for my job?

Please remember that you are charged resources per node: of course when memory becomes an issue, then you need to reduce the number of tasks per node. However you will gain not only the extra memory but also more memory bandwidth, so the code should run a bit faster. If your application makes use of OpenMP threads, you might try to use less tasks per node and set `--cpus-per-task` within your batch script, that distribute them evenly across the node. In some cases you might gain a speed up, but this is strongly application dependent.

---

## How to get information on the SLURM configuration and the available nodes

The SLURM commands to get the SLURM and the nodes configuration are the following:
```
scontrol show config
scontrol show nodes
```

---

## How can I place and release a job from hold state?

In order to place a job on hold type `scontrol hold JOB_ID`.

To release the job from the hold state, issue `scontrol release JOB_ID`.

---

## What is the meaning of SLURM job state codes?

Jobs typically pass through several states in the course of their execution, as displayed by the `squeue` command. 
(e.g.: PENDING, RUNNING, SUSPENDED, COMPLETING and COMPLETED). An explanation of each state follows:
* CA (CANCELLED): the job was explicitly cancelled by the user or system administrator. The job may or may not have been initiated.
* CD (COMPLETED): the job has terminated all processes on all nodes.
* CF (CONFIGURING): the job has been allocated resources, but are waiting for them to become ready for use (e.g.booting).
* CG (COMPLETING): the job is in the process of completing. Some processes on some nodes may still be active.
* F (FAILED): the job terminated with non-zero exit code or other failure condition.
* NF (NODE_FAIL): the job terminated due to failure of one or more allocated nodes.
* PD (PENDING): the job is awaiting resource allocation.
* PR (PREEMPTED): the job terminated due to preemption.
* R (RUNNING): the job currently has an allocation.
* S (SUSPENDED): the job has an allocation, but execution has been suspended.
* TO (TIMEOUT): the job terminated upon reaching its time limit.

---

## How can I view the list of available nodes and partitions?

The command `sinfo -a -l` gives you a list of the available partitions and `scontrol show partition <partition_name>` will give you the details of the chosen partition. If you don't specify a partition, you will see the details of all the partitions visible on the system.

---

## How can I list all my jobs currently in the queue?

You can see your jobs in the queue issuing the command `squeue -a -l -u $USER`. In order to see details on a specific job, type `scontrol show <SLURM_JOB_ID>`, where `<SLURM_JOB_ID>` is your jobid. If you want to delete one of your submitted jobs, the command you need is `scancel <SLURM_JOB_ID>`.

---

## How can I display the accounting information of my past SLURM jobs?

You can get this information using the command `sacct -l -u $USER`. Please check the man pages `man sacct` for more options.

---

## What resources are available for pre- and post-processing?

The system for pre- and post-processing for production projects at CSCS is Piz Daint. Please don't run directly on the login nodes, as they are a shared resource: you should submit your job on the SLURM partition `prepost`, adding the following line in your SLURM batch script: `#SBATCH --partition=prepost`. 

Alternatively, you can submit your job using the command `sbatch --partition=prepost`.

Please note that the following preference list holds:
* command line argument (`--partition=`)
* script directive (`#SBATCH --partition=`)

If the post-processing job depends on a production job running on Piz Daint, please use the SLURM dependency option.

---

# Compiling and Running

---

## Where can I find the documentation of the systems available at CSCS?

You can find the documentation on the systems available at CSCS on the [CSCS web site](http://www.cscs.ch) and on the [CSCS User Portal](/). 

The different sections listed in the top menu of the pages will guide you through the facilities offered to the users community.

---

## Where can I find a list of the module commands?

You can have a list of the most useful module commands printed on the screen typing `module`.

---

## How can I check the commands and flags invoked by the compiler wrapper?

After you load all modules that you need, you can issue one of the following commands to have a list of the flags invoked by the appropriate compiler wrapper: `cc -###` (or `ftn` or `CC` in place of `cc`) or `cc -v` (or `ftn` or `CC` in place of `cc`). 

Depending on the Programming Environment that you have loaded, you might need to give a filename on the command line, however an empty `foo.c` or `foo.f90` or `foo.C` will be enough (e.g.: the Cray compiler requires a filename with the option `-v`).

---

## How can I find the path to a library on the system?

In order to compile your code on a machine at CSCS you should load the module of a Programming Environment and of the libraries that you need:
* `module avail` lists of the modules available on the machine
* `module show "modulename"` lists the variables and paths related to a single module (change modulename with the module of your choice)
On Cray systems you should use the wrapper to compile (`ftn` for Fortran, `cc` for C or `CC` for C++): the wrapper will add the correct path of the libraries that have been loaded. Please visit [Compiling your code](/scientific_computing/compiling_your_code) for more information.

---

## Why do I get `Illegal instruction` when running my code?

The system on which you have compiled your code have a different architecture with respect to the compute nodes of the system where you are trying to run your executable.
The Cray compiler wrappers provided by the programming environment on Cray systems will cross-compile your code in order to run on the compute nodes.

---

## Why do I get an error linking the MPI library?
```
fatal error: mpi.h: No such file or directory. Compilation terminated.
```
On the Cray systems you should compile your code using the compiler wrappers:
* `cc` for C
* `CC` for C++
* `ftn` for Fortran
Please set the proper compiler driver in your Makefile and the MPI libraries will be linked automatically.

---

## Linking FFTW libraries fails

Your configure script is likely not picking up the fftw library: please, examine the configure log to see where it fails. The command `module show fftw` will print on screen the version and paths of the loaded module, in case you need to add them manually during configuration.
The Cray wrapper (`cc`, `CC` or `ftn`) should link the library automatically, if the corresponding module is loaded.

---

## Where can I find BLAS and SCALAPACK on Cray systems?

BLAS and SCALAPACK functions are provided by the `cray-libsci` module on Cray systems. The following commands will give you some information on the module:
```
module show cray-libsci
module help cray-libsci
```
If you use the flag `-v` when compiling with the wrapper, you will see a verbose list of all the include and library paths called by the compiler driver.

---

## Which modules provide optimized scientific libraries?

Please have a look at `module help cray-tpsl` on Cray systems. TPSL (Third Party Scientific Libraries) is the name of a module containing a collection of mathematical libraries that can be used with PETSc and Trilinos for solving problems in dense and sparse linear algebra. 

The tpsl module is automatically loaded when PETSc or Trilinos is loaded. The libraries included are Hypre, SuperLU, SuperLU_dist, MUMPs, ParMetis, Sundials, and Scotch.

---

## Can I run the same executable on different systems at CSCS?

Not in general: it may happen that the architecture of the processors are not compatible, as well as their communication libraries.

---

## I have problems running my executable dynamically linked to shared libraries

In order to use the available libraries dynamically, you have to add the library directory to the path list of the environment variable `$LD_LIBRARY_PATH` before the execution of your job starts. E.g. for `/user/lib64` you would export it as below:
```
export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/lib64 (bash)
set LD_LIBRARY_PATH ${LD_LIBRARY_PATH}:/usr/lib64    (csh)
```
The Cray compiler wrappers link statically by default, unless you use the option `-dynamic` or set `export CRAY_LINK_TYPE=dynamic`. If you cannot use static libraries since only the corresponding dynamic libraries are available, then you should always load the system module containing the missing library. The appropriate paths to the library will be added to the compiler wrappers \(`ftn` for Frotran codes, `cc` for C, `CC` for C++\). For example, if you are missing the netcdf library, then you should add the corresponding module by typing `module load netcdf` in your shell.

---

## How can I check the free memory on selected nodes?

Out of memory error (OOM) might arise from a temporarily low free memory on a node: you can check the free memory on the nodes that you allocate by inserting the following command in your batch script:
```
srun -n $SLURM_JOB_NUM_NODES --ntasks-per-node=1 free -m
```
The free memory per node is usually slightly less than the nominal value, since it is partly used by the filesystem. If the free memory on the nodes where you run is already close to the maximum value, then please try running with more nodes, using fewer tasks per node.

---

## How to check the memory usage of a code

You can insert in your code the C or Fortran examples that you find in `/project/csstaff/examples/memory`: they read the file `/proc/self/statm` and print current information about memory usage, measured in page units (please type `man 5 proc` for more details):
* size (total program size, same as VmSize in `/proc/[pid]/status`);
* resident set size (same as VmRSS in `/proc/[pid]/status`);
* share (shared pages, from shared mappings);
* text (text code);
* lib (library, unused in Linux 2.6);
* data (data + stack);
* dt (dirty pages, unused in Linux 2.6)

The CUDA runtime API provides memory management functions such as `cudaMemGetInfo` which can be called to get the free and total amount of memory available on GPU devices in bytes. For more details, please have a look at the cudatoolkit documentation with the command `module help cudatoolkit`.

---

## How can I measure the performance of an application?

The flop/s is a rate of execution of 64 bits floating point operations (either addition or multiplication) per second. Its multiples are Mflop/s (millions), Gflop/s (billions), Tflop/s (trillions) and so on...

The theoretical peak performance is the upper bound peak rate of execution of floating point operations for a given processor. It can determined by counting the number of floating-point additions and multiplications (in full precision) that can be completed during the clock time of the processor.

Flop/s can give a measure of&nbsp;application performance: given a processor's theoretical peak performance, one can work out how efficiently the cpu's floating point units are used. An application which runs at 10% of the peak performance has room for optimization, while one that runs over 50% is probably not going to improve much unless the underlying algorithm is rewritten

Most performance tools can measure the floating-point rate of execution  of any given application (for instance, Craypat on Cray systems).

---

# Data Management

---

## What is the cleaning policy on `/scratch?`

The `/scratch` filesystem is cleaned by a script on a regular basis: please check the cleaning policy on the [Filesystems web page](/storage/file_systems).

Unfortunately, once the files on `/scratch` have been deleted, there is no way to recover them. In fact, `/scratch` is meant to keep only the temporary files needed for a run.

---

## Why did I run out of space on `$HOME?`

The disk space available on each user's `$HOME` is 10 Gb, while the group data under the `/project` filesystem have a separate and bigger quota in general. However the quota on `/project` is shared by all members of the group.

---

## I cannot use ftp to connect to the systems

You should be able to use `rsync`, `scp` or `sftp` instead: please check the availability of these commands using `which` on your local terminal. For more information on their usage, please have a look at the corresponding manual pages with the command `man`. Large data transfers should use the [Data Transfer](/storage/data_transfer) service offered by CSCS.

---

## How can I check my quota on `/project?`

You can check your quota on `$HOME=/users/<username>` and `$PROJECT=/project/<project_id>` with the command `quota` on the front-end system Ela (ela.cscs.ch) only. 
Please note that on `/project` the number of files as well is listed on the first line in output (`N. FILE USED ON PROJECT`): kindly consider archiving folders with the `tar` command in order to keep low the number of files owned by your group.

---

## How to transfer large data sets efficiently

If you want to copy your output files from a CSCS production system to your local client, outgoing connections will work if your client has a static IP address.

In case you need to transfer a large amount of data from your local platform to your folder under `/project` or `/store` at CSCS or viceversa, then should use the [Data Transfer](/storage/data_transfer) service offered by CSCS.
