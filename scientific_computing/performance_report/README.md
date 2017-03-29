# Performance Report

As high-performance computing resources become larger and more heterogeneous,
using them to their full potential for scientific research becomes increasingly
challenging. 
CSCS implements a review process of [production projects allocation](http://www.cscs.ch/user_lab/allocation_schemes/index.html) 
with the evaluation of users application performance to improve the distribution of computing resources.

[Cray Performance and Analysis Tools (CrayPAT)](/scientific_computing/code_analysis/craypat) are the recommended performance tools on Cray systems, providing detailed information about application performance for basic profiling, MPI/OpenMP tracing,  hardware performance counters, ...

## How to produce the performance report

Please proceed through the following steps:

1. first run a scaling test of your application before instrumenting the executable and report the scalability data and plot in the section __Representative Benchmarks and Scaling__ of your proposal, following the guidelines provided in the [performance report template](performance_report_template.pdf). You can use the [LaTeX template](performance_report_template.tex) to create the PDF file, using the module `texlive` on the front-end Ela:
 ```bash
 pdflatex --shell-escape performance_report_template.tex
 ```
  Based on the scaling data you can select the most parallel efficient job size for the performance report, following the guidelines of the template;
 
1. In order to instrument your application with CrayPAT and produce the performance report, please load the appropriate perftool-cscs modulefile: 
 ```bash
 module load daint-gpu
 module load perftools-cscs/645-cuda
 ```
 You should load the module `perftools-cscs/645-nogpu` or `perftools-cscs/645-openacc` if your code does not make use of the GPU or if it uses OpenACC respectively. Then build your application as usual with the module loaded, to create an executable instrumented to run the performance analysis: the instrumented binary file which can be used within the SLURM batch script with the optimal job size to produce the performance report file, without the need to load the perftools modulefile again;

1. when the performance SLURM job exits successfully, you should find in your working folder two files with extension `.rpt` (report text file) and `.ap2` (apprentice binary file). Please make the two files `.rpt` and `.ap2` available for inspection by the reviewers, either by enclosing them at submission time or indicating within the section __Performance Analysis__ of your proposal where they can be accessed for reading under your $HOME or $PROJECT (not $SCRATCH). Please also report in this section a summary of the performance data extracted from the report text file `.rpt`, as in the following example:
 ```
 CrayPat/X:  Version 6.4.5 Revision 87dd5b8  01/23/17 15:37:24
 Experiment:                   lite  lite/gpu     
 Number of PEs (MPI ranks):      16
 Numbers of PEs per Node:         1  PE on each of  16  Nodes
 Numbers of Threads per PE:   1,114
 Number of Cores per Socket:     12
 Execution start time:  Tue Mar 28 15:15:55 2017
 System name and speed:  nid02294  2601 MHz (approx)
 Intel haswell CPU  Family:  6  Model: 63  Stepping:  2


 Avg Process Time:     2,100 secs             
 High Memory:       13,977.3 MBytes     873.6 MBytes per PE
 I/O Read Rate:    67.110363 MBytes/sec       
 I/O Write Rate:   19.512511 MBytes/sec    

 |  31.8% |   664.415775 |         -- |    -- |     35,648.0 |MPI_SYNC
 |   2.8% |    58.511390 |         -- |    -- | 14,458,788.1 |MPI
 ```
 The first part comes from the top of the report text file, while USER and MPI data from Table 1. They can be retrieved with the following commands:
 ```
 grep -A 14 CrayPat/X <report>.rpt
 grep \|USER <report>.rpt
 grep \|MPI <report>.rpt
 ```
 Please check as well the [example performance report file](example_performance_report_file.html) provided.

## Additional information

We strongly encourage you to choose meaningful and representative job sizes,
wallclock time and configurations. All proposals can only be evaluated by the
data that you provide: the better the data, the easier to pass the review process.

If you use a scientific application supported by CSCS, we will provide the
instrumented executable in a modulefile: please contact us in case the
modulefile has not been provided yet.

Advanced users can run a full performance analysis with CrayPAT if they wish,
instrumenting their executable with the standard `perftools` module, as long as
they provide in their proposals a performance report with the information
required above, enclosing the required report files as well.

If your application does not run with CrayPat or help is needed in order to
recompile it, please do not hesitate to contact us. For more details on
proposal submission, please have a look at the webinars at the following link:
* [Webinars on Proposal Submission](https://www.youtube.com/playlist?list=PL1tk5lGm7zvRnZJZQkVyC9wx-_1eiEJ5v)

> Please note that the Cuda Multi Process Service is currently not supported by Cray perftools, therefore you cannot produce a meaningful report when you run with `CRAY_CUDA_MPS=1` on Piz Daint. In this case please contact us and report the scalability test of your application with the performance of your representative benchmark.
