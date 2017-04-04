# Performance Report

As high-performance computing resources become larger and more heterogeneous,
using them to their full potential for scientific research becomes increasingly
challenging. 
CSCS implements a review process of [Production Projects Submissions](http://www.cscs.ch/user_lab/allocation_schemes/submission100/index.html) with the evaluation of users application performance to improve the distribution of computing resources.

[Cray Performance and Analysis Tools (CrayPAT)](/scientific_computing/code_analysis/craypat) are the recommended performance tools on Cray systems, providing detailed information about application performance for basic profiling, MPI/OpenMP tracing, hardware performance counters, ...

## How to produce the performance report

Please proceed through the following steps:

1. first run a scaling test of your application before instrumenting the executable and report the scalability data and plot in the section __Representative Benchmarks and Scaling__ of your proposal, following the guidelines provided in the [performance report template](performance_report_template.pdf). You can use the [LaTeX template](performance_report_template.tex) to create the PDF file after loading the module `texlive` on the front-end Ela:
 ```bash
ela:~$ module load texlive 
ela:~$ pdflatex --shell-escape performance_report_template.tex (run it twice)
 ```
  Then select the most parallel efficient job size to run the performance analysis, on the basis of your scaling data;
 
1. instrument your application with CrayPAT to run the performance analysis, loading the appropriate perftool-cscs modulefile: 
 ```bash
 module load daint-gpu
 module load perftools-cscs/645-cuda
 ```
 You should load the module `perftools-cscs/645-nogpu` or `perftools-cscs/645-openacc` instead if your code does not make use of the GPU or if it uses OpenACC respectively. Then build your application as usual with the module loaded: the binary file created is instrumented and can be used in your batch script to run at the optimal job size and produce the performance report files, without the need to load the perftools modulefile again. If you use a [supported application](/scientific_computing/supported_applications), we will provide the modulefile with with the instrumented executable under the following path:
 ```bash
 module use /apps/daint/UES/6.0.UP02/craypat/easybuild/modules/all
 ```
 
1. when the performance analysis job terminates successfully, you should find in your working folder two files with extension `.rpt` (report text file) and `.ap2` (apprentice binary file). Please make these two files available for inspection, either by enclosing them at submission time or indicating within the section __Performance Analysis__ of your proposal where they can be accessed under `$HOME` or `$PROJECT` (not `$SCRATCH`). Please report within this section a summary of the performance data extracted from the report text file, using the following commands:
 ```bash
 grep -A 7 CrayPat/X <report>.rpt
 grep \|USER <report>.rpt
 grep \|MPI <report>.rpt
 grep \|Total <report>.rpt
 ```
 The summary should look like the example below:
 ```text
 CrayPat/X:  Version 6.4.5 Revision 87dd5b8  01/23/17 15:37:24
 Experiment:                   lite  lite/gpu     
 Number of PEs (MPI ranks):      16
 Numbers of PEs per Node:         1  PE on each of  16  Nodes
 Numbers of Threads per PE:   1,114
 Number of Cores per Socket:     12
 Execution start time:  Tue Mar 28 15:15:55 2017
 System name and speed:  nid02294  2601 MHz (approx)
 
 |  59.2% | 1,236.266484 | 110.728787 |  8.8% |          1.0 |USER
 
 |  31.8% |   664.415775 |         -- |    -- |     35,648.0 |MPI_SYNC
 |   2.8% |    58.511390 |         -- |    -- | 14,458,788.1 |MPI

 100.0% | 2,086.808412 |         -- |    -- | 18,723,148.8 |Total
 100.0% | 1.89 |  105,946 |   287.62 | 75,246 |Total
 56.092035 | 3,764.356845 |  67.110363 | 62,097,047.0 |    63.57 |Total
 0.151159 | 2.949494 |  19.512511 | 74,334.0 |    41.61 |Total
```
The first command extracts general information on the job, then we extract the statistics of `USER` and `MPI` functions; the last command reports the `Total` of each Table (functions, accelerator, read and write statistics). You might also check the step-by-step [example performance report](example_performance_report) provided.

## Additional information

We strongly encourage you to choose meaningful and representative job sizes,
wallclock time and configurations. All proposals can only be evaluated by the
data that you provide: the better the data, the easier to pass the review process.

Advanced users can run a full performance analysis with CrayPAT if they wish,
instrumenting their executable with the standard `perftools` module, as long as
they provide in their proposals a performance report with the information
required above, enclosing the required report files as well.

If your application does not run with CrayPat or help is needed in order to
recompile it, please do not hesitate to contact us. For more details on
proposal submission, please have a look at the webinars at the following link:
* [Webinars on Proposal Submission](https://www.youtube.com/playlist?list=PL1tk5lGm7zvRnZJZQkVyC9wx-_1eiEJ5v)

> Please note that the Cuda Multi Process Service is currently not supported by Cray perftools, therefore you cannot produce a meaningful report when you run with `CRAY_CUDA_MPS=1` on Piz Daint. In this case please contact us and report the scalability test of your application with the performance of your representative benchmark.
