# Performance Report

As high-performance computing resources become larger and more heterogeneous, using them to their full potential for scientific research becomes increasingly challenging. CSCS intends to extend the production projects allocation process to include performance information about user applications in order to improve the allocation of compute resources, thus enabling more results of scientific merit. 

CrayPat is the recommended performance analysis tool for Cray systems: it provides detailed information about application performance, it can be used for basic profiling, MPI/OpenMP tracing and hardware performance counter based analysis. CrayPat also provides access to a variety of performance experiments that measure how an executable program consumes resources while it is running, as well as several different user interfaces that provide access to the experiment and reporting functions.

## How to produce the performance report

Please proceed through the following steps:
1. first run a scalability test of your application before instrumenting the executable and report the scalability plot in your proposal. In order to do so, please follow the guidelines provided in the [performance report template](performance_report_template.pdf): you can use the [LaTeX template](performance_report_template.tex) as well as the [Gnuplot script](scalability.gp) to produce the report file with the scalability plot;

1. once you have selected the optimal job size for your benchmark following the guidelines, you should run your instrumented executable to produce the performance report. In order to instrument your application, please load the appropriate perftool-cscs modulefiles:
 ```
 module load daint-gpu
 module load perftools-cscs/645-cuda
 ```
 You should load the module `perftools-cscs/645-nogpu` or `perftools-cscs/645-openacc` if your code does not make use of the GPU or if it uses OpenACC respectively. Then build your application as usual, to create the binary file instrumented for performance analysis: the executable can then be used within the SLURM batch script of the optimal job size to produce the performance report, without loading the perftools modulefile;

1. when your job exits successfully, two files with extension `.rpt` (report file) and `.ap2` (apprentice file) will be written in your working folder. Please attach both files to your proposal submission and enclose within the text of the proposal a summary of the performance data extracted from the report file `.rpt`, as in the following example:
 ```
    Number of PEs (MPI ranks):     16
    Numbers of PEs per Node:        8  PEs on each of  2  Nodes
    Numbers of Threads per PE:      1
    Number of Cores per Socket:     8
    Execution start time:  Wed Sep 24 16:49:15 2014
    System name and speed:  daint05 2601 MHz

    Process Time:          1366  secs       85.368 secs per PE
    High Memory:        858.441 MBytes      53.653 MBytes per PE
    MFLOPS (aggregate):   15447 M/sec      965.459 M/sec per PE
    I/O Read Rate:       90.281 MBytes/sec        
    I/O Write Rate:      83.975 MBytes/sec

    |  25.0% | 2122.2 |     -- |    -- |MPI

    |  24.4% | 2074.2 |     -- |    -- |USER

    Read (MBytes): 18.724653 MBytes

    Write (MBytes): 38.421875 MBytes
 ```

 The first ten lines come from the top of the report file; USER and MPI are listed in Table 1, Read and Write in Table 2. Please complete the summary information following the guidelines available in the performance report template and check the [example performance report](example_performance_report) available (please note that this report comes from a small testcase, therefore it is shown only to help you find the required information within the text).

## Additional information

We strongly encourage you to choose meaningful and representative job sizes, wallclock time and configurations: all proposals can only be evaluated by the data you provide, the better the data, the easier to pass the review process.

If you use a scientific application supported by CSCS, we will provide the instrumented executable in a modulefile: please contact us in case the modulefile has not been provided yet.

Advanced users can run a full performance analysis with CrayPAT if they wish, instrumenting their executable with the standard perftools module, as long as they provide in their proposals a performance report with the information required above, enclosing the required report files as well.

If your application does not run with CrayPat or help is needed in order to recompile it, please do not hesitate to contact us. For more details on proposal submission, please have a look at the webinars at the following link:
  * [Webinars on Proposal Submission](https://www.youtube.com/playlist?list=PL1tk5lGm7zvRnZJZQkVyC9wx-_1eiEJ5v)

> Please note that the Cuda Multi Process Service is currently not supported by Cray perftools, therefore you cannot produce a meaningful report when `CRAY_CUDA_MPS=1` on Piz Daint. In this case please contact us and submit the scalability test of your application and a measure of the performance of your representative benchmark.
