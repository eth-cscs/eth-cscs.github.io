# Example Performance Report

We provide an example of perfomance report that might be used as a starting point for your CSCS Production Project Submission, 
as a template to run your representative benchmarks, scaling test and the performance analysis in particular.

The example that we use is a small benchmark of the [CP2K](www.cp2k.org) software package, simulating the dynamics of a 
water box featuring 256 water molecules: the basis set, the input file, the potential and the SLURM submission script 
can be retrieved downloading the [corresponding package](benchmark.tar.gz):
```text
Input files:
 GTH_BASIS_SETS
 H2O-256.inp
 POTENTIAL

SLURM batch script:
 cp2k.sbatch
```

The job will run with the SLURM constraint `gpu` on the Cray XC50, using 1 MPI task per node and 12 OpenMP threads. 
The SLURM batch script will write the output in `$SLURM_JOB_ID.out` and will append the wall time of each job
to a log file called `$SLURM_JOB_NAME.log`, which will be used to create the scaling plot and the table.

## Scaling

We start the scaling test on 2 nodes and we will use the corresponding wall time as a reference to compute 
the speed-up of larger job sizes. We then proceed doubling the number of nodes and checking the corresponding speed-up, 
until we are sure to have reached the ∼ 50% limit in parallel efficiency: this happens at 16 nodes in this small example.

The log file saved by the template SLURM batch script after 5 jobs on 2, 4, 8, 16 and 32 nodes will look like the following:
```text
daint 2017-03-28T11:53:55 1227132 	 Time=1022.373
daint 2017-03-28T10:40:12 1225749 	 Time=476.175
daint 2017-03-28T10:55:23 1225965 	 Time=339.370
daint 2017-03-28T11:01:58 1226149 	 Time=209.510
daint 2017-03-28T11:20:48 1226554 	 Time=206.249
```
You see in columns the `$SLURM_CLUSTER_NAME`, the submit time, the `$SLURM_JOB_ID` and the wall time in seconds, as measured 
by the application itself and printed in the output file `slurm-$SLURM_JOB_ID.out`. We can therefore compute the corresponding speed-up:

Nodes | Wall time (s) | Speed-up
 ---: | ---: | ---:
    2 | 1022 | 1.00
    4 |  476 | 2.15
    8 |  339 | 3.01
   16 |  210 | 4.87
   32 |  206 | 4.96

[Strong scaling results](scaling.pdf) can be plotted against the ideal scaling using the Gnuplot script below:
```gnuplot
set terminal postscript eps enhanced color size 5.5,3.5
set output "scaling.eps"
set xlabel "Number of Nodes"
set ylabel "Speed-up"
set key left
set size 1.,1.
plot "-" w linespoints linewidth 2 title "H_{2}O benchmark", x/2 w lines lt 3 title "Ideal Speed-up"
 2 1.00 
 4 2.15
 8 3.01
16 4.87 
32 4.96
```

# Performance Analysis

Please check the complete [example performance report file](example_performance_report_file.html) produced by CrayPAT.
